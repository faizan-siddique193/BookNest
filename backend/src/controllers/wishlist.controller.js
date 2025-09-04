import { WishList } from "../models/wishlist.model.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiRespone.js";
import mongoose from "mongoose";
const addToWishList = asyncHandler(async (req, res) => {
  const { bookId } = req.body;
  const userId = req.user.user_id;

  if (!bookId) throw new ApiError(404, "BookId is required");

  let wishlist = await WishList.findOne({ userId });
  if (!wishlist) {
    wishlist = new WishList({ userId, books: [bookId] });
  } else {
    if (wishlist.books.includes(bookId)) {
      return res.json(new ApiResponse(403, "Book already in wishlist"));
    }
    wishlist.books.push(bookId);
  }

  await wishlist.save();

  const updatedWishlist = await WishList.findOne({ userId }).populate("books");
  return res.json(new ApiResponse(201, updatedWishlist, "Book added successfully"));
});

const deleteWishListItem = asyncHandler(async (req, res) => {
  const { bookId } = req.body;
  const userId = req.user.user_id;
  if (!bookId) throw new ApiError(400, "BookId is required");

  const wishlist = await WishList.findOneAndUpdate(
    { userId },
    { $pull: { books: bookId } },
    { new: true }
  ).populate("books");

  if (!wishlist || wishlist.books.length === 0) {
    await WishList.deleteOne({ userId });
    return res.json(new ApiResponse(200, [], "Wishlist is empty now"));
  }

  return res.json(new ApiResponse(200, wishlist, "Book deleted successfully"));
});

const getWhislistItem = asyncHandler(async (req, res) => {
  const userId = req.user.user_id;
  const wishlist = await WishList.findOne({ userId }).populate("books");
  if (!wishlist) return res.json(new ApiResponse(404, [], "Wishlist empty"));

  return res.json(new ApiResponse(200, wishlist, "Fetched wishlist successfully"));
});

export { addToWishList, getWhislistItem, deleteWishListItem };
