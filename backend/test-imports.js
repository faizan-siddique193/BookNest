import "dotenv/config";

console.log("✅ dotenv loaded");

try {
  console.log("📦 Importing express...");
  import("express").then(() => console.log("✅ express imported"));

  console.log("📦 Importing cors...");
  import("cors").then(() => console.log("✅ cors imported"));

  console.log("📦 Importing morgan...");
  import("morgan").then(() => console.log("✅ morgan imported"));

  console.log("📦 Importing socket.io...");
  import("socket.io").then(() => console.log("✅ socket.io imported"));

  console.log("📦 Importing firebaseAdmin...");
  import("./src/config/firebaseAdmin.js").then(() =>
    console.log("✅ firebaseAdmin imported"),
  );

  console.log("📦 Importing routes...");
  import("./src/routes/user.route.js").then(() =>
    console.log("✅ user route imported"),
  );

  // Give imports time to complete
  setTimeout(() => {
    console.log("✅ Async test complete");
    process.exit(0);
  }, 3000);
} catch (error) {
  console.error("❌ Error:", error.message);
  console.error(error);
}
