import "dotenv/config";
import mongoose from "mongoose";
import { Order } from "./src/models/order.model.js";

const uid = "ytCD9XJacuUBQ8QEYsmHMZhELxp2";
await mongoose.connect(`${process.env.MONGODB_URL}/bookstore`);
const docs = await Order.find({ userId: uid }).lean();
console.log("count", docs.length);
console.log(JSON.stringify(docs, null, 2));
await mongoose.disconnect();
