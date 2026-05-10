import "dotenv/config";
import mongoose from "mongoose";
import { Order } from "./src/models/order.model.js";
import "./src/models/book.model.js";

const uid = "ytCD9XJacuUBQ8QEYsmHMZhELxp2";
await mongoose.connect(`${process.env.MONGODB_URL}/bookstore`);
try {
  const totalOrders = await Order.countDocuments({ userId: uid });
  const orders = await Order.find({ userId: uid })
    .sort({ createdAt: -1 })
    .skip(0)
    .limit(2)
    .populate("items.bookId", "title author price");

  console.log({ totalOrders, count: orders.length });
  console.log(JSON.stringify(orders, null, 2));
} catch (error) {
  console.error("ERROR", error);
}
await mongoose.disconnect();
