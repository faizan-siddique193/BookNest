import Stripe from "stripe";
import { Order } from "../models/order.model.js";
import { Payment } from "../models/payment.model.js";
import { ApiResponse } from "../utils/ApiRespone.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/AsyncHandler.js";

// stripe instance
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const createStripePayment = asyncHandler(async (req, res) => {
  const userId = req.user?.user_id;

  const { orderId } = req.body;

  // check order id
  if (!orderId) {
    throw new ApiError(400, "Order ID is required");
  }

  // Find order and populate book details
  const order = await Order.findById(orderId).populate("items.bookId");

  // TODO: DELETE THIS COMMENT
  console.log("Order log:: ", order);

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
    paymentMethod: "stripe",
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

    // TODO: DELETE THIS COMMENT
    console.log("Order item log:: ", item, "and book:", item.bookId);

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
    success_url: `${process.env.CROSS_ORIGIN}/home/order-confirmation/${order._id}?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.CROSS_ORIGIN}/home/checkout?canceled=true`,
    metadata: {
      orderId: String(order._id),
      userId: String(userId),
    },
  });

  // TODO: PRING SESSION
  console.log("Pring Session:: ", session);
  // Save or update payment record
  let payment = await Payment.findOne({ orderId, status: "PENDING" });

  if (payment) {
    // Update existing pending payment
    payment.transactionId = session.id;
    /*  payment.providerMeta = {
      checkoutUrl: session.url,
      sessionId: session.id,
    }; */

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
      /*  providerMeta: {
        checkoutUrl: session.url,
        sessionId: session.id,
      }, */
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
  let event;

  // TODO: delete this comment
  console.log("⚡ Webhook hit!");
console.log("Event type:", event.type);


  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("Webhook verification failed:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  try {
    switch (event.type) {
      // Fired when user successfully completes checkout
      case "checkout.session.completed": {
        const session = event.data.object;

        const payment = await Payment.findOne({ transactionId: session.id });
        if (payment) {
          payment.status = "COMPLETED";
          await payment.save();
          
          // TODO: DELETE THIS COMMENT
          console.log("Payment status is updated::", payment);
        }
        break;
      }

      // TODO: Optional: handle expired or failed sessions
      /* case "checkout.session.expired": {
        const session = event.data.object;
        const order = await Order.findById(session.metadata?.orderId);
        if (order) {
          order.paymentStatus = "FAILED";
          await order.save();
        }
        break;
      }
 */
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    res.status(200).json({ received: true });
  } catch (error) {
    console.error("Webhook processing failed:", error);
    res.status(500).send("Internal server error");
  }
});

export { createStripePayment, webhookEndpoints };
