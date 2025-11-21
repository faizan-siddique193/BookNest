import { Router } from "express";
import {
  createReview,
  getBookReviewsByBookId,
  getMyReviews,
  updateReview,
  deleteReview,
  getBookReviewStats,
  checkUserReview,
  getAllReviews,
} from "../controllers/review.controller.js";
import { verifyFirebaseToken } from "../middlewares/verifyFirrebaseToken.middleware.js";

const reviewRouter = Router();

// Get all reviews for a book
reviewRouter.route("/book/:slug").get(getBookReviewsByBookId);
reviewRouter.route("/book/:bookId/stats").get(getBookReviewStats); // Get rating statistics

// Protected routes (auth required)
reviewRouter.route("/book/:slug").post(verifyFirebaseToken, createReview); // Create review
reviewRouter
  .route("/book/:bookId/check")
  .get(verifyFirebaseToken, checkUserReview); // Check if user reviewed
reviewRouter.route("/my-reviews").get(verifyFirebaseToken, getMyReviews); // Get user's reviews
reviewRouter
  .route("/update/:reviewId")
  .patch(verifyFirebaseToken, updateReview); // Update review
reviewRouter
  .route("/delete/:reviewId")
  .delete(verifyFirebaseToken, deleteReview); // Delete review
reviewRouter.route("/allReview").get(getAllReviews);
export default reviewRouter;
