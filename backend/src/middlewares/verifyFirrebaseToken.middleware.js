import { auth } from "../config/firebaseAdmin.js";
import { ApiError } from "../utils/ApiError.js";

export const verifyFirebaseToken = async (req, res, next) => {
  const token = req.headers.authorization?.replace("Bearer", "").trim();

  if (!token) {
    throw new ApiError(401, "Unauthorized: No token provided");
  }

  // decoding token
  try {
    const decodedToken = await auth.verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    console.error("Firebase token verification error:", error);
    throw new ApiError(401, "Unauthorized: Invalid token", [], error.stack);
  }
};
