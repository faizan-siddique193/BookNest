import "dotenv/config";
import { startCronJobs } from "./src/utils/cronJobs.js";

console.log("✅ Starting cron jobs test...");

try {
  startCronJobs();
  console.log("✅ Cron jobs started successfully");
} catch (error) {
  console.error("❌ Cron jobs error:", error.message);
}

// Give cron jobs a moment to start
setTimeout(() => {
  console.log("✅ Cron jobs test complete");
  process.exit(0);
}, 2000);
