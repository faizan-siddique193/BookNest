import mongoose from "mongoose";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { Book } from "../models/book.model.js";
import { ApiResponse } from "../utils/ApiRespone.js";
import { Review } from "../models/review.model.js";

// Validation helper
const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

// Create a review
const createReview = asyncHandler(async (req, res) => {
  const { bookId } = req.params;
  const userId = req.user.user_id;
  const { rating, comment } = req.body;

  // Validate inputs
  if (!isValidObjectId(bookId)) {
    throw new ApiError(400, "Invalid book ID.");
  }

  if (!rating || typeof rating !== "number" || rating < 1 || rating > 5) {
    throw new ApiError(400, "Rating must be a number between 1 and 5.");
  }

  // Sanitize comment
  const sanitizedComment = comment ? String(comment).trim().slice(0, 1000) : "";

  // Check if book exists
  const book = await Book.findById(bookId).select("_id");
  if (!book) throw new ApiError(404, "Book not found.");

  // Prevent duplicate reviews
  const existing = await Review.findOne({ bookId, userId });
  if (existing) {
    throw new ApiError(409, "You have already reviewed this book.");
  }

  // Create review
  const review = await Review.create({
    userId,
    bookId,
    rating,
    comment: sanitizedComment,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, review, "Review created successfully."));
});

// Get all reviews for a specific book
const getBookReviews = asyncHandler(async (req, res) => {
  const { bookId } = req.params;

  if (!isValidObjectId(bookId)) {
    throw new ApiError(400, "Invalid book ID.");
  }

  const page = Math.max(parseInt(req.query.page) || 1, 1);
  const limit = Math.min(parseInt(req.query.limit) || 10, 50);
  const skip = (page - 1) * limit;

  // Check if book exists
  const book = await Book.findById(bookId).select("_id");
  if (!book) throw new ApiError(404, "Book not found.");

  const [items, total] = await Promise.all([
    Review.find({ bookId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate("userId", "fullName email")
      .lean(),
    Review.countDocuments({ bookId }),
  ]);

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        items,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit),
        },
      },
      "Reviews fetched successfully."
    )
  );
});

// Get current user's reviews
const getMyReviews = asyncHandler(async (req, res) => {
  const userId = req.user.user_id;
  const page = Math.max(parseInt(req.query.page) || 1, 1);
  const limit = Math.min(parseInt(req.query.limit) || 10, 50);
  const skip = (page - 1) * limit;

  const [items, total] = await Promise.all([
    Review.find({ userId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate("bookId", "title author price coverImage")
      .lean(),
    Review.countDocuments({ userId }),
  ]);

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        items,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit),
        },
      },
      "Your reviews fetched successfully."
    )
  );
});

// Update a review
const updateReview = asyncHandler(async (req, res) => {
  const { reviewId } = req.params;
  const userId = req.user.user_id;
  const { rating, comment } = req.body;

  if (!isValidObjectId(reviewId)) {
    throw new ApiError(400, "Invalid review ID.");
  }

  // Validate at least one field is being updated
  if (rating === undefined && comment === undefined) {
    throw new ApiError(400, "Provide at least rating or comment to update.");
  }

  // Find review and check ownership
  const review = await Review.findById(reviewId);
  if (!review) throw new ApiError(404, "Review not found.");

  if (String(review.userId) !== String(userId)) {
    throw new ApiError(403, "You can only edit your own reviews.");
  }

  // Build update object
  const updates = {};

  if (rating !== undefined) {
    if (typeof rating !== "number" || rating < 1 || rating > 5) {
      throw new ApiError(400, "Rating must be a number between 1 and 5.");
    }
    updates.rating = rating;
  }

  if (comment !== undefined) {
    updates.comment = String(comment).trim().slice(0, 1000);
  }

  // Update review
  const updatedReview = await Review.findByIdAndUpdate(
    reviewId,
    { $set: updates },
    { new: true, runValidators: true }
  ).populate("bookId", "title author");

  return res
    .status(200)
    .json(new ApiResponse(200, updatedReview, "Review updated successfully."));
});

// Delete a review
const deleteReview = asyncHandler(async (req, res) => {
  const { reviewId } = req.params;
  const userId = req.user.user_id;
  const isAdmin = req.user?.role === "admin";

  if (!isValidObjectId(reviewId)) {
    throw new ApiError(400, "Invalid review ID.");
  }

  const review = await Review.findById(reviewId);
  if (!review) throw new ApiError(404, "Review not found.");

  // Check permissions (owner or admin)
  if (!isAdmin && String(review.userId) !== String(userId)) {
    throw new ApiError(403, "You can only delete your own reviews.");
  }

  await review.deleteOne();

  return res
    .status(200)
    .json(new ApiResponse(200, null, "Review deleted successfully."));
});

// Get review statistics for a book (optional helper)
const getBookReviewStats = asyncHandler(async (req, res) => {
  const { bookId } = req.params;

  if (!isValidObjectId(bookId)) {
    throw new ApiError(400, "Invalid book ID.");
  }

  const book = await Book.findById(bookId).select("_id");
  if (!book) throw new ApiError(404, "Book not found.");

  const stats = await Review.aggregate([
    { $match: { bookId: new mongoose.Types.ObjectId(bookId) } },
    {
      $group: {
        _id: null,
        averageRating: { $avg: "$rating" },
        totalReviews: { $sum: 1 },
        ratings: {
          $push: "$rating",
        },
      },
    },
    {
      $project: {
        _id: 0,
        averageRating: { $round: ["$averageRating", 1] },
        totalReviews: 1,
        ratingDistribution: {
          fiveStar: {
            $size: {
              $filter: {
                input: "$ratings",
                cond: { $eq: ["$$this", 5] },
              },
            },
          },
          fourStar: {
            $size: {
              $filter: {
                input: "$ratings",
                cond: { $eq: ["$$this", 4] },
              },
            },
          },
          threeStar: {
            $size: {
              $filter: {
                input: "$ratings",
                cond: { $eq: ["$$this", 3] },
              },
            },
          },
          twoStar: {
            $size: {
              $filter: {
                input: "$ratings",
                cond: { $eq: ["$$this", 2] },
              },
            },
          },
          oneStar: {
            $size: {
              $filter: {
                input: "$ratings",
                cond: { $eq: ["$$this", 1] },
              },
            },
          },
        },
      },
    },
  ]);

  const result =
    stats.length > 0
      ? stats[0]
      : {
          averageRating: 0,
          totalReviews: 0,
          ratingDistribution: {
            fiveStar: 0,
            fourStar: 0,
            threeStar: 0,
            twoStar: 0,
            oneStar: 0,
          },
        };

  return res
    .status(200)
    .json(
      new ApiResponse(200, result, "Review statistics fetched successfully.")
    );
});

// Check if user has reviewed a book (helper for UI)
const checkUserReview = asyncHandler(async (req, res) => {
  const { bookId } = req.params;
  const userId = req.user.user_id;

  if (!isValidObjectId(bookId)) {
    throw new ApiError(400, "Invalid book ID.");
  }

  const review = await Review.findOne({ bookId, userId }).lean();

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        hasReviewed: !!review,
        review: review || null,
      },
      "Review status checked."
    )
  );
});

export {
  createReview,
  getBookReviews,
  getMyReviews,
  updateReview,
  deleteReview,
  getBookReviewStats,
  checkUserReview,
};
