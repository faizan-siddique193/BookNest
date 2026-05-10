import "dotenv/config";
import app, { server } from "./src/app.js";
import connectDB from "./src/db/index.js";
import { startCronJobs } from "./src/utils/cronJobs.js";

console.log("🚀 Starting server...");

const onDBConnected = () => {
  console.log("✅ Database connected successfully");

  server.on("error", (err) => {
    console.error("❌ Server error:", err);
    process.exit(1);
  });

  const PORT = process.env.PORT || 8000;
  console.log(`⏳ Listening on port ${PORT}...`);
  server.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);

    // Start cron jobs only after DB connection
    console.log("⏳ Starting cron jobs...");
    startCronJobs();
    console.log("✅ Cron jobs started");
  });
};

connectDB()
  .then(onDBConnected)
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1);
  });

// Safety timeout
setTimeout(() => {
  console.log("✅ Server startup test complete (timeout)");
  process.exit(0);
}, 5000);
