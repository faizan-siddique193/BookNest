import dotenv from "dotenv";
import app, { server } from "./app.js";
import connectDB from "./db/index.js";
import { startCronJobs } from "./utils/cronJobs.js";
import logger from "./utils/logger.js";

dotenv.config({
  path: ".env",
});

console.log("🚀 Starting server...");

connectDB()
  .then(() => {
    console.log("✅ Database connected successfully");

    server.on("error", (err) => {
      // Server startup failed
      console.error("❌ Server error:", err);
      logger.error("Server error:", err);
      process.exit(1);
    });

    const PORT = process.env.PORT || 8000;
    server.listen(PORT, () => {
      console.log(`✅ Server running on port ${PORT}`);
      logger.info(`Server running on port ${PORT}`);
    });

    // Start cron jobs only after DB connection
    startCronJobs();
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err);
    logger.error("MongoDB connection failed:", err);
    process.exit(1);
  });
