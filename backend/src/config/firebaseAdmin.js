import { initializeApp, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import serviceAccount from "../secret/serviceAccountKey.js";


// Initialize Firebase Admin SDK
const firbaseApp = initializeApp({
  credential: cert(serviceAccount),
});

export const auth = getAuth(firbaseApp);
