import cron from "node-cron";
import { Order } from "../models/order.model.js";

export const startCronJobs = () => {
  cron.schedule("*/5 * * * *", async () => {
    try {
      const now = new Date();
      const result = await Order.updateMany(
        {
          status: "PENDING",
          paymentMethod: { $ne: "cash-on-delivery" },
          expiresAt: { $lt: now },
        },
        { $set: { status: "CANCELLED" } }
      );
      if (result.modifiedCount > 0) {
        console.log(`Cancelled ${result.modifiedCount} expired orders.`);
      }
    } catch (err) {
      console.error("Error running cron:", err);
    }
  });
};
