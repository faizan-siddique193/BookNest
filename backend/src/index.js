import app from "./app.js";
import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { startCronJobs } from "./utils/cronJobs.js";
dotenv.config({
  path: "./env",
});
connectDB()
  .then(() => {
    app.on("err", () => {
      // Server startup failed
      throw err;
    });

    app.listen(process.env.PORT || 8000, () => {
      // Server running successfully
    });
  })
  .catch((err) => {
    // MongoDB connection failed
  });

//   start cron job
startCronJobs();
