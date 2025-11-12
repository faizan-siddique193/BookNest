import { initializeApp, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import serviceAccount from "./serviceAccount.js";


// Initialize Firebase Admin SDK
const firbaseApp = initializeApp({
  credential: cert(serviceAccount),
});

export const auth = getAuth(firbaseApp);
