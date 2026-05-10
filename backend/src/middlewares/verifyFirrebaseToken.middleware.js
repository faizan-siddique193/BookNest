import { auth } from "../config/firebaseAdmin.js";
import { ApiError } from "../utils/ApiError.js";
import logger from "../utils/logger.js";

export const verifyFirebaseToken = async (req, res, next) => {
  try {
    // Extract token from "Bearer <token>"
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        statusCode: 401,
        data: null,
        message: "Unauthorized: No token provided",
      });
    }

    const token = authHeader.substring(7); // Remove "Bearer " prefix

    // decoding token
    const decodedToken = await auth.verifyIdToken(token);
    // Map uid to user_id for backward compatibility
    req.user = {
      ...decodedToken,
      user_id: decodedToken.uid,
    };
    logger.info(`User authenticated: ${decodedToken.uid}`);
    next();
  } catch (error) {
    logger.error(
      `Firebase token verification error: ${error?.message || error}`,
    );
    return res.status(401).json({
      statusCode: 401,
      data: null,
      message: "Unauthorized: Invalid token",
      error: error?.message,
    });
  }
};
