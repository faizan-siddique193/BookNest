import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ChevronRight,
  Star,
  Heart,
  ShoppingCart,
  BookOpen,
  User,
  ChevronLeft,
  ChevronDown,
  Plus,
  Minus,
} from "lucide-react";
import {
  AddComment,
  AboutAuthor,
  BookDescription,
  Breadcrumb,
  ReviewForm,
  ReviewCard,
} from "../../Component/index";
import { useDispatch, useSelector } from "react-redux";
import { getBookById } from "../../feature/book/bookAction";
import { toast } from "react-toastify";
import {
  addToCart,
  updateCartItemQuantity,
} from "../../feature/cart/cartAction";
import { updateQuantityOptimistic } from "../../feature/cart/cartSlice";
import {
  addToWishList,
  deleteWishlistItem,
  getWishlistItem,
} from "../../feature/wishlist/wishlistAction";
import {
  addWishlistOptimistic,
  removeWishlistOptimistic,
} from "../../feature/wishlist/wishlistSlice";
import { getReviewsByBookId } from "../../feature/review/reviewAction";
import InfiniteScroll from "react-infinite-scroll-component";

const BookDetailPage = () => {
  const [activeTab, setActiveTab] = useState("description");
  const [quantity, setQuantity] = useState(0);
  const [book, setBook] = useState(null);
  const { slug } = useParams();
  const { bookReviews, currentPage, totalPages, totalReviews, hasMore } =
    useSelector((state) => state.review);

  const limit = 3;

  const dispatch = useDispatch();

  // add to wishlist
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

  // Fetch book and initial reviews on mount
  useEffect(() => {
    const fetchBookAndReviews = async () => {
      try {
        const response = await dispatch(getBookById({ slug })).unwrap();
        console.log("Book detail response:", response);
        setBook(response.data);
        
        // Fetch initial reviews with limit
        await dispatch(getReviewsByBookId({ slug, page: 1 })).unwrap();
      } catch (error) {
        console.error("Internal server error:", error);
      }
    };
    fetchBookAndReviews();
  }, [slug, dispatch]);

  // Fetch more reviews for infinite scroll
  const fetchMoreReviews = async () => {
    if (!hasMore) return; 
    try {
      console.log("Fetching more reviews for page:", currentPage + 1);
      await dispatch(
        getReviewsByBookId({ slug, page: currentPage + 1 })
      ).unwrap();
    } catch (error) {
      console.error("Error fetching more reviews:", error);
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

  return (
    <div className="bg-background min-h-screen">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <Breadcrumb
          items={[
            { label: "Home", path: "/" },
            { label: "Books", path: "/books" },
            { label: "Book Detail", path: "" },
          ]}
        />
      </div>

      {/* Main Book Display */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row justify-start items-start gap-8">
          {/* Left Column - Book Cover */}
          <div className="w-full lg:w-[300px] flex-shrink-0 flex justify-center items-start">
            <img
              src={book?.image}
              alt={book?.title}
              className="w-full h-auto max-h-[500px] object-contain rounded-xl transition-transform duration-300 group-hover:scale-105"
            />
          </div>

          {/* Right Column - Book Info */}
          <div className="flex-1 max-w-4xl">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              {/* Book Title */}
              <h1 className="text-3xl font-bold text-primary mb-2">
                {book?.title}
              </h1>
              <p className="text-lg text-muted mb-4">by {book?.author}</p>

              {/* Average Rating */}
              <div className="flex items-center mb-6">
                <div className="flex mr-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-5 w-5 ${
                        star <= Math.floor(book?.averageRating)
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-primary font-medium">
                  {book?.averageRating.toFixed(1)}
                </span>
                <span className="mx-2 text-muted">•</span>
                <button className="text-accent">Write Review</button>
              </div>

              {/* Price */}
              <div className="flex items-center mb-6">
                <span className="text-lg font-bold text-primary mr-3">
                  ${book?.price.toFixed(2)}
                </span>
              </div>

              {/* Category & Availability */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-sm text-muted">Category</p>
                  <p className="text-primary font-medium">{book?.category}</p>
                </div>
                <div>
                  <p className="text-sm text-muted">Availability</p>
                  <p
                    className={`font-medium ${
                      book?.stock > 0 ? "text-success" : "text-danger"
                    }`}
                  >
                    {book?.stock > 0
                      ? `In Stock (${book?.stock})`
                      : "Out of Stock"}
                  </p>
                </div>
              </div>

              {/* Add to Cart & Wishlist */}
              <div className="flex flex-wrap items-center gap-4 mb-8">
                <button
                  className={`flex-1 py-3 px-6 rounded-lg font-medium transition-colors flex items-center justify-center ${
                    book?.stock > 0
                      ? "bg-accent text-white hover:bg-accent/90"
                      : "bg-gray-200 text-muted cursor-not-allowed"
                  }`}
                  disabled={book?.stock <= 0}
                  onClick={() => handleAddToCart(book._id)}
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Add to Cart
                </button>

                <button
                  className="p-2 border border-gray-300 rounded hover:bg-gray-50"
                  onClick={() => handleWishlistItem(book)}
                >
                  <Heart
                    className={`h-4 w-4 transition-colors ${
                      isInWishlist(book?._id)
                        ? "fill-red-600 text-red-600"
                        : "text-gray-500"
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Tabs Navigation */}
          <div className="border-b border-gray-200">
            <nav className="flex flex-wrap">
              <button
                className={`py-4 px-6 font-medium text-sm transition-colors ${
                  activeTab === "description"
                    ? "text-accent border-b-2 border-accent"
                    : "text-muted hover:text-primary"
                }`}
                onClick={() => setActiveTab("description")}
              >
                Description
              </button>
              <button
                className={`py-4 px-6 font-medium text-sm transition-colors ${
                  activeTab === "reviews"
                    ? "text-accent border-b-2 border-accent"
                    : "text-muted hover:text-primary"
                }`}
                onClick={() => setActiveTab("reviews")}
                id="reviews"
              >
                Reviews ({totalReviews || 0})
              </button>
            </nav>
          </div>

          {/* Tabs Content */}
          <div className="p-6">
            {activeTab === "description" && (
              <BookDescription description={book?.description} />
            )}

            {activeTab === "reviews" && (
              <div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {/* Reviews List with Infinite Scroll - Fixed Height Container */}
                  <div
                    id="reviews-scroll-container"
                    className="h-96 overflow-y-auto border border-gray-200 rounded-lg bg-gray-50 p-2"
                  >
                    <InfiniteScroll
                      dataLength={bookReviews?.length || 0}
                      next={fetchMoreReviews}
                      hasMore={hasMore}
                      loader={
                        <div className="flex justify-center py-4">
                          <div className="text-sm text-muted">
                            Loading more reviews...
                          </div>
                        </div>
                      }
                      endMessage={
                        bookReviews.length > 0 && (
                          <div className="flex justify-center py-4">
                            <div className="text-sm text-muted">
                              No more reviews
                            </div>
                          </div>
                        )
                      }
                      scrollableTarget="reviews-scroll-container"
                      scrollThreshold={0.9}
                      style={{ overflow: "visible" }}
                    >
                      {bookReviews?.map((review) => (
                        <ReviewCard key={review._id} review={review} />
                      ))}
                    </InfiniteScroll>
                  </div>

                  <div className="md:col-span-2">
                    <h3 className="text-xl font-bold text-primary mb-4">
                      Leave a Review
                    </h3>
                    <ReviewForm />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetailPage;