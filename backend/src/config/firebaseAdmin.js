import "dotenv/config";
import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import serviceAccount from "./serviceAccount.js";

// Check if already initialized
let firbaseApp;
if (getApps().length === 0) {
  try {
    console.log("🔧 Initializing Firebase Admin SDK...");
    // Initialize Firebase Admin SDK
    firbaseApp = initializeApp({
      credential: cert(serviceAccount),
    });
    console.log("✅ Firebase Admin SDK initialized");
  } catch (error) {
    console.error("❌ Firebase Admin SDK initialization error:", error.message);
    console.error(error);
    // Continue without throwing - allow app to start
    firbaseApp = null;
  }
} else {
  firbaseApp = getApps()[0];
  console.log("✅ Firebase Admin SDK already initialized");
}

export const auth = firbaseApp ? getAuth(firbaseApp) : null;
