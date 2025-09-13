import mongoose from "mongoose";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Review } from "../models/Review.js";
import { Book } from "../models/Book.js";
import { Order } from "../models/Order.js";
// import { User } from "../models/User.js";

// recompute book rating
const recomputeBookRating = async (bookId) => {
  const stats = await Review.aggregate([
    { $match: { bookId: new mongoose.Types.ObjectId(bookId) } },
    {
      $group: {
        _id: "$bookId",
        avg: { $avg: "$rating" },
        count: { $sum: 1 },
      },
    },
  ]);

  const averageRating = stats.length ? Number(stats[0].avg.toFixed(2)) : 0;
  const reviewsCount = stats.length ? stats[0].count : 0;

  await Book.findByIdAndUpdate(
    bookId,
    { averageRating, reviewsCount },
    { new: true }
  );
};

export const createReview = asyncHandler(async (req, res) => {
  const bookId = req.params.bookId;
  const userUid = req.user.user_id;
  const { rating, comment } = req.body;

  if (!rating || rating < 1 || rating > 5) {
    throw new ApiError(400, "Rating must be between 1 and 5.");
  }

  // Ensure book exists
  const book = await Book.findById(bookId).select("_id");
  if (!book) throw new ApiError(404, "Book not found.");

  // (Optional) Only allow users who purchased the book to review it
  const PURCHASED_ONLY = false; // set to true if you want this policy
  if (PURCHASED_ONLY) {
    const purchased = await Order.exists({
      userId: req.user.user_id, // adjust if you store ObjectId
      "items.bookId": book._id,
      status: { $in: ["pending", "completed"] }, // acceptable states
    });
    if (!purchased) {
      throw new ApiError(403, "Only buyers can review this book.");
    }
  }

  // Prevent duplicate review (one per user per book)
  const existing = await Review.findOne({ bookId, userId: userUid });
  if (existing) throw new ApiError(409, "You already reviewed this book.");

  // Create review
  const review = await Review.create({
    bookId,
    userId: userUid, // if you store ObjectId, use req.user._id
    rating,
    comment: comment || "",
  });

  // Update book rating stats
  await recomputeBookRating(bookId);

  return res
    .status(201)
    .json(new ApiResponse(201, review, "Review created successfully."));
});

// get book reviews
export const getBookReviews = asyncHandler(async (req, res) => {
  const bookId = req.params.bookId;
  const page = Math.max(parseInt(req.query.page) || 1, 1);
  const limit = Math.min(parseInt(req.query.limit) || 10, 50);
  const skip = (page - 1) * limit;

  // Ensure book exists
  const book = await Book.findById(bookId).select("_id");
  if (!book) throw new ApiError(404, "Book not found.");

  const [items, total] = await Promise.all([
    Review.find({ bookId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate("userId", "fullName email") // if userId is ref to User
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

// get my reviews
export const getMyReviews = asyncHandler(async (req, res) => {
  const userUid = req.user.user_id; // or req.user._id
  const page = Math.max(parseInt(req.query.page) || 1, 1);
  const limit = Math.min(parseInt(req.query.limit) || 10, 50);
  const skip = (page - 1) * limit;

  const [items, total] = await Promise.all([
    Review.find({ userId: userUid })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate("bookId", "title author price")
      .lean(),
    Review.countDocuments({ userId: userUid }),
  ]);

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        items,
        pagination: { page, limit, total, pages: Math.ceil(total / limit) },
      },
      "Your reviews fetched successfully."
    )
  );
});

// update review
export const updateReview = asyncHandler(async (req, res) => {
  const { reviewId } = req.params;
  const userUid = req.user.user_id; // or req.user._id
  const { rating, comment } = req.body;

  const review = await Review.findById(reviewId);
  if (!review) throw new ApiError(404, "Review not found.");

  if (String(review.userId) !== String(userUid)) {
    throw new ApiError(403, "You are not allowed to edit this review.");
  }

  if (rating !== undefined) {
    if (rating < 1 || rating > 5)
      throw new ApiError(400, "Rating must be between 1 and 5.");
    review.rating = rating;
  }
  if (comment !== undefined) review.comment = comment;

  await review.save();

  // Recompute book rating
  await recomputeBookRating(review.bookId);

  return res
    .status(200)
    .json(new ApiResponse(200, review, "Review updated successfully."));
});

// delete review
export const deleteReview = asyncHandler(async (req, res) => {
  const { reviewId } = req.params;
  const userUid = req.user.user_id; // or req.user._id
  const isAdmin = req.user?.role === "admin"; // adapt to your role system

  const review = await Review.findById(reviewId);
  if (!review) throw new ApiError(404, "Review not found.");

  if (!isAdmin && String(review.userId) !== String(userUid)) {
    throw new ApiError(403, "You are not allowed to delete this review.");
  }

  const bookId = review.bookId;
  await review.deleteOne();

  // Recompute book rating
  await recomputeBookRating(bookId);

  return res
    .status(200)
    .json(new ApiResponse(200, null, "Review deleted successfully."));
});

// admin list reviews
export const adminListReviews = asyncHandler(async (req, res) => {
  if (req.user?.role !== "admin") throw new ApiError(403, "Forbidden.");

  const { bookId, userId } = req.query;
  const page = Math.max(parseInt(req.query.page) || 1, 1);
  const limit = Math.min(parseInt(req.query.limit) || 20, 100);
  const skip = (page - 1) * limit;

  const filter = {};
  if (bookId) filter.bookId = bookId;
  if (userId) filter.userId = userId;

  const [items, total] = await Promise.all([
    Review.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate("bookId", "title")
      .populate("userId", "fullName email")
      .lean(),
    Review.countDocuments(filter),
  ]);

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        items,
        pagination: { page, limit, total, pages: Math.ceil(total / limit) },
      },
      "All reviews fetched."
    )
  );
});
