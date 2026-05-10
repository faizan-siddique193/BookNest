import "dotenv/config";
import connectDB from "./src/db/index.js";

console.log("✅ Starting DB connection test...");
console.log("📦 MongoDB URL:", process.env.MONGODB_URL ? "SET" : "NOT SET");

connectDB()
  .then(() => {
    console.log("✅ Database connected successfully");
    process.exit(0);
  })
  .catch((err) => {
    console.error("❌ Database connection failed:", err.message);
    process.exit(1);
  });

// Safety timeout
setTimeout(() => {
  console.error("❌ Database connection timeout (10 seconds)");
  process.exit(1);
}, 10000);
