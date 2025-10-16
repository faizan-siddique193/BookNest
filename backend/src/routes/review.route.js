import { Router } from "express";
import {
  createReview,
  getBookReviews,
  getMyReviews,
  updateReview,
  deleteReview,
  getBookReviewStats,
  checkUserReview,
} from "../controllers/review.controller.js";
import { verifyFirebaseToken } from "../middlewares/verifyFirrebaseToken.middleware.js";

const reviewRouter = Router();

// Public routes (no auth required)
reviewRouter.route("/book/:bookId").get(getBookReviews); // Get all reviews for a book
reviewRouter.route("/book/:bookId/stats").get(getBookReviewStats); // Get rating statistics

// Protected routes (auth required)
reviewRouter.route("/book/:bookId").post(verifyFirebaseToken, createReview); // Create review
reviewRouter
  .route("/book/:bookId/check")
  .get(verifyFirebaseToken, checkUserReview); // Check if user reviewed
reviewRouter.route("/my-reviews").get(verifyFirebaseToken, getMyReviews); // Get user's reviews
reviewRouter.route("/:reviewId").patch(verifyFirebaseToken, updateReview); // Update review
reviewRouter.route("/:reviewId").delete(verifyFirebaseToken, deleteReview); // Delete review

export default reviewRouter;
