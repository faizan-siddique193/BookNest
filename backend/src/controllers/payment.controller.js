import Stripe from "stripe";
import { Order } from "../models/order.model.js";
import { Payment } from "../models/payment.model.js"
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const startStripePayment = asyncHandler(async (req, res) => {
  const userId = req.user.user_id || req.user._id;
  const { orderId } = req.body;

  const order = await Order.findById(orderId);
  if (!order) throw new ApiError(404, "Order not found");

  // Optional: block if payment already exists for this order
  const existing = await Payment.findOne({ orderId });
  if (existing)
    throw new ApiError(409, "Payment already started for this order");

  const intent = await stripe.paymentIntents.create({
    amount: Math.round(order.totalAmount * 100), // cents
    currency: "usd",
    metadata: { orderId: String(order._id), userId: String(userId) },
  });

  const payment = await Payment.create({
    userId,
    orderId: order._id,
    amount: order.totalAmount,
    currency: "USD",
    method: "stripe",
    status: "pending",
    transactionId: intent.id,
    providerMeta: { clientSecret: intent.client_secret },
  });

  // Attach to order (if you keep ref on Order)
  order.payment = payment._id;
  await order.save();

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { clientSecret: intent.client_secret },
        "Payment initiated"
      )
    );
});


