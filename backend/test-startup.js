import "dotenv/config";

console.log("✅ dotenv loaded");

try {
  console.log("📦 Importing app...");
  const { default: app, server } = await import("./src/app.js");
  console.log("✅ App imported successfully");
} catch (error) {
  console.error("❌ Error importing app:", error.message);
  console.error(error);
}

console.log("✅ Startup test complete");
