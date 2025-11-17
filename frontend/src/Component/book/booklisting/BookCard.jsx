import React from "react";
import { Star, Heart, ShoppingCart } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  addToWishList,
  deleteWishlistItem,
  getWishlistItem,
} from "../../../feature/wishlist/wishlistAction";
import { addToCart } from "../../../feature/cart/cartAction";
import { toast } from "react-toastify";
import {
  addWishlistOptimistic,
  removeWishlistOptimistic,
} from "../../../feature/wishlist/wishlistSlice";

const BookCard = ({ book }) => {
  const dispatch = useDispatch();
  const { wishlist } = useSelector((state) => state.wishlist);

  // Check if book is in wishlist
  const isInWishlist = (bookId) =>
    wishlist?.some((item) => String(item._id) === String(bookId));

  // Toggle wishlist item
  const handleWishlistItem = async (book) => {
    try {
      if (isInWishlist(book._id)) {
        dispatch(removeWishlistOptimistic(book._id));
        await dispatch(deleteWishlistItem({ bookId: book._id })).unwrap();
      } else {
        dispatch(addWishlistOptimistic(book));
        await dispatch(addToWishList({ bookId: book._id })).unwrap();
      }
      dispatch(getWishlistItem());
    } catch (error) {
      toast.error("Something went wrong while adding to wishlist");
    }
  };

  // Add to cart function
  const handleAddToCart = async (bookId) => {
    try {
      await dispatch(addToCart({ bookId })).unwrap();
      toast.success("Book added to cart");
    } catch (error) {
      toast.error(error?.message || "Failed to add book to cart");
    }
  };

  // Fallback image if missing
  const coverImage =
    book.coverImage ||
    book.image ||
    "https://via.placeholder.com/200x300?text=No+Image";

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all flex flex-col w-full max-w-[250px] mx-auto">
      {/* Book Cover */}
      <Link to={`/books/${book.slug}`} className="w-full block">
        <div className="aspect-[2/3] relative bg-gray-100 overflow-hidden">
          <img
            src={coverImage}
            alt={book.title}
            className="w-full h-full object-cover transition-transform hover:scale-105"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                "https://via.placeholder.com/200x300?text=No+Image";
            }}
          />
        </div>
      </Link>

      {/* Book Details */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        {/* Title */}
        <h3 className="font-semibold text-primary mb-1 line-clamp-2 text-sm h-10 overflow-hidden">
          {book.title}
        </h3>

        {/* Author */}
        {book.author && (
          <p className="text-xs text-gray-500 mb-2 line-clamp-1">
            {book.author}
          </p>
        )}

        {/* Ratings */}
        <div className="flex items-center mb-2">
          <div className="flex mr-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`h-3 w-3 ${
                  star <= Math.floor(book.averageRating || 0)
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-gray-500">
            {book.averageRating?.toFixed(1) || "0.0"}
          </span>
        </div>

        {/* Price + Stock */}
        <div className="flex justify-between items-center mb-3">
          <div>
            {book.discountPrice ? (
              <>
                <span className="font-bold text-accent mr-2 text-sm">
                  ${book.discountPrice.toFixed(2)}
                </span>
                <span className="text-xs text-gray-400 line-through">
                  ${book.price.toFixed(2)}
                </span>
              </>
            ) : (
              <span className="font-bold text-primary text-sm">
                ${book.price?.toFixed(2) || "0.00"}
              </span>
            )}
          </div>
          <div className="text-xs">
            {book.stock > 0 ? (
              <span className="text-green-600">In Stock</span>
            ) : (
              <span className="text-red-600">Out of Stock</span>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between space-x-2">
          {/* Add to Cart */}
          <button
            className="py-2 px-3 bg-accent hover:bg-accent/90 text-white text-xs font-medium rounded transition-colors flex items-center justify-center flex-1"
            onClick={() => handleAddToCart(book._id)}
            disabled={book.stock <= 0}
          >
            <ShoppingCart className="h-3 w-3 mr-1" />
            Add to Cart
          </button>

          {/* Add/Delete Wishlist */}
          <button
            className="p-2 border border-gray-300 rounded hover:bg-gray-50"
            onClick={() => handleWishlistItem(book)}
          >
            <Heart
              className={`h-4 w-4 transition-colors ${
                isInWishlist(book._id)
                  ? "fill-red-600 text-red-600"
                  : "text-gray-500"
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
