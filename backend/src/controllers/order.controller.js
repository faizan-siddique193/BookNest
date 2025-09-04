import mongoose from "mongoose";
import { Cart } from "../models/cart.model.js";
import { Book } from "../models/book.model.js";
import { Order } from "../models/order.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiRespone.js";
import { asyncHandler } from "../utils/AsyncHandler.js";

const placeOrder = asyncHandler(async (req, res) => {
  const {
    fullName,
    phoneNumber,
    email,
    address,
    city,
    postalCode,
    country,
    paymentMethod,
  } = req.body;
  console.log("Address fields:: ", req.body);

  const userId = req.user.user_id;

  if (
    [
      fullName,
      phoneNumber,
      email,
      address,
      city,
      postalCode,
      country,
      paymentMethod,
    ].some((field) => !field || field.trim() === "")
  ) {
    throw new ApiError(400, "All shipping address fields are required.");
  }

  // find user cart

  const cart = await Cart.findOne({ userId }).lean();
  if (!cart || !cart.items || cart.items.length === 0) {
    throw new ApiError(400, "Your cart is empty.");
  }

  const orderItems = [];
  let totalAmount = 0;
  const orderDurationMinutes = 5;

  for (const item of cart.items) {
    const book = await Book.findById(item.bookId).lean();
    if (!book) {
      throw new ApiError(404, `Book not found: ${item.bookId}`);
    }

    const priceAtPurchase = Number(book.price);
    const qty = Number(item.quantity);

    if (qty <= 0) {
      throw new ApiError(400, "Quantity must be at least 1.");
    }

    totalAmount += priceAtPurchase * qty;

    orderItems.push({
      bookId: book._id,
      quantity: qty,
      priceAtPurchase,
    });
  }

  const session = await mongoose.startSession();
  try {
    await session.withTransaction(async () => {
      const order = await Order.create(
        [
          {
            userId,
            items: orderItems,
            shippingAddress: {
              fullName,
              phoneNumber,
              email,
              address,
              city,
              postalCode,
              country,
            },
            totalAmount,
            paymentMethod,
            payment: null,
            expiresAt: new Date(Date.now() + orderDurationMinutes * 60 * 1000),
          },
        ],
        { session }
      );

      //   decrement in the stock
      for (const item of orderItems) {
        await Book.updateOne(
          { _id: item.bookId, stock: { $gte: item.quantity } },
          { $inc: { stock: -item.quantity } },
          { session }
        );
      }

      //    Clear the cart after successfull order
      await Cart.deleteOne({ userId }, { session });

      return res
        .status(201)
        .json(new ApiResponse(201, order[0], "Order placed successfully"));
    });
  } finally {
    session.endSession();
  }
});

const getMyOrders = asyncHandler(async (req, res) => {
  const userId = req.user.user_id;
  const orders = await Order.find({ userId })
    .sort({ createdAt: -1 })
    .populate("items.bookId", "title author price");

  return res
    .status(200)
    .json(new ApiResponse(200, orders, "Orders fetched successfully"));
});

const getOrderById = asyncHandler(async (req, res) => {
  const userId = req.user.user_id;
  const { orderId } = req.params;

  const order = await Order.findById(orderId).populate(
    "items.bookId",
    "title author price"
  );
  if (!order) throw new ApiError(404, "Order not found");

  if (String(order.userId) !== String(userId)) {
    throw new ApiError(403, "You are not allowed to view this order");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, order, "Order fetched successfully"));
});

const updateOrderStatus = asyncHandler(async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;
  const userId = req.user.user_id;

  if (!["pending", "completed", "cancelled"].includes(status)) {
    throw new ApiError(400, "Invalid status");
  }

  const user = await User.findOne({ firebaseUserId: userId });

  if (user?.role !== "admin") {
    throw new ApiError(401, "Unauthorized user");
  }

  const order = await Order.findById(orderId);
  if (!order) throw new ApiError(404, "Order not found");

  order.status = status;
  await order.save();

  return res
    .status(200)
    .json(new ApiResponse(200, order, "Order status updated"));
});

export { placeOrder, updateOrderStatus, getOrderById, getMyOrders };
