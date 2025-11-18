import Stripe from "stripe";
import { Order } from "../models/order.model.js";
import { Payment } from "../models/payment.model.js";
import { ApiResponse } from "../utils/ApiRespone.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/AsyncHandler.js";

// stripe instance
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
// webhook secret
const WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET;

const createStripePayment = asyncHandler(async (req, res) => {
  const userId = req.user?.user_id;
  const { orderId } = req.body;

  // check order id
  if (!orderId) {
    throw new ApiError(400, "Order ID is required");
  }

  // Find order and populate book details
  const order = await Order.findById(orderId).populate("items.bookId");

  if (!order) {
    throw new ApiError(404, "Order not found");
  }

  // Check if order belongs to the user
  if (order.userId.toString() !== userId.toString()) {
    throw new ApiError(403, "Unauthorized to access this order");
  }

  // Prevent duplicate payments for completed orders
  const existingPayment = await Payment.findOne({
    orderId,
    method: "stripe", 
    status: "COMPLETED",
  });

  if (existingPayment) {
    throw new ApiError(409, "Payment already completed for this order");
  }

  // Validate order items
  if (!order.items || order.items.length === 0) {
    throw new ApiError(400, "Order has no items");
  }

  // Create line items for Stripe
  const lineItems = order.items.map((item) => {
    if (!item.bookId) {
      throw new ApiError(400, "Invalid book item in order");
    }

    return {
      price_data: {
        currency: "usd",
        product_data: {
          name: item.bookId.title || "Book Item",
          description: item.bookId.author || "",
          images: item.bookId.image ? [item.bookId.image] : undefined,
        },
        unit_amount: Math.round(item.priceAtPurchase * 100), // Convert to cents
      },
      quantity: item.quantity,
    };
  });

  // Create Stripe Checkout Session
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    line_items: lineItems,
    customer_email: order.shippingAddress?.email,
    success_url: `${process.env.CROSS_ORIGIN}/order-confirmation/${order._id}?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.CROSS_ORIGIN}/checkout?canceled=true`,
    metadata: {
      orderId: String(orderId),
      userId: String(userId),
    },
    // Add client_reference_id as fallback for webhook lookup
    client_reference_id: String(orderId),
  });

  // Save or update payment record
  let payment = await Payment.findOne({
    orderId,
    status: "PENDING",
    method: "stripe",
  });

  if (payment) {
    // Update existing pending payment
    payment.transactionId = session.id;
    await payment.save();
  } else {
    // Create new payment record
    payment = await Payment.create({
      userId,
      orderId: order._id,
      amount: order.totalAmount,
      currency: "USD",
      method: "stripe",
      status: "PENDING",
      transactionId: session.id,
    });
  }

  // Link payment to order
  order.payment = payment._id;
  await order.save();

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { url: session.url, sessionId: session.id },
        "Stripe checkout session created successfully"
      )
    );
});

// stripe webhook handler
const webhookEndpoints = asyncHandler(async (req, res) => {
  const sig = req.headers["stripe-signature"];

  // validate signature
  if (!sig) {
    console.error("No stripe-signature header found");
    return res.status(400).send("Webhook Error: No signature header");
  }

  // construct event
  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, WEBHOOK_SECRET);
  } catch (err) {
    console.error("Stripe webhook signature verification failed:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  console.log(`Webhook received: ${event.type}`);

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object;

        // Try multiple lookup strategies to find the payment
        let payment = null;

        // Strategy 1: Find by transactionId (most reliable)
        payment = await Payment.findOne({
          transactionId: session.id,
          method: "stripe",
        });

        // Strategy 2: Find by orderId from client_reference_id
        if (!payment && session.client_reference_id) {
          payment = await Payment.findOne({
            orderId: session.client_reference_id,
            method: "stripe",
            status: "PENDING",
          });
        }

        // Strategy 3: Find by orderId from metadata
        if (!payment && session.metadata?.orderId) {
          payment = await Payment.findOne({
            orderId: session.metadata.orderId,
            method: "stripe",
            status: "PENDING",
          });
        }

        if (!payment) {
          console.error("Payment not found for session:", session.id);
          // Don't throw error - return 200 so Stripe doesn't retry
          return res.status(200).json({
            received: true,
            warning: "Payment not found",
          });
        }

        // Update payment status
        payment.status = "COMPLETED";
        payment.transactionId = session.id;
        await payment.save();

        // Update associated order status
        const order = await Order.findById(payment.orderId);
        if (order) {
          order.paymentStatus = "PAID"; // or "COMPLETED" depending on your schema
          order.orderStatus = "CONFIRMED"; // Update order status as needed
          await order.save();
          console.log(`Order ${order._id} updated to PAID`);
        } else {
          console.warn(`Order not found for payment ${payment._id}`);
        }

        console.log(`Payment ${payment._id} completed successfully`);
        break;
      }

      case "checkout.session.expired": {
        const session = event.data.object;

        // Find and mark payment as failed/expired
        const payment = await Payment.findOne({
          transactionId: session.id,
          method: "stripe",
        });

        if (payment && payment.status === "PENDING") {
          payment.status = "FAILED";
          await payment.save();
          console.log(
            `Payment ${payment._id} marked as FAILED (session expired)`
          );
        }
        break;
      }

      case "payment_intent.payment_failed": {
        const paymentIntent = event.data.object;

        // Handle failed payments
        const payment = await Payment.findOne({
          transactionId: paymentIntent.id,
          method: "stripe",
        });

        if (payment) {
          payment.status = "FAILED";
          await payment.save();
          console.log(`Payment ${payment._id} marked as FAILED`);
        }
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return res.status(200).json({ received: true });
  } catch (error) {
    console.error("Webhook processing failed:", error);
    // Return 200 to prevent Stripe from retrying
    return res.status(200).json({
      received: true,
      error: "Processing failed",
    });
  }
});

export { createStripePayment, webhookEndpoints };
