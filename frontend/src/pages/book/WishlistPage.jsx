// src/pages/WishlistPage.jsx
import React, { useEffect } from "react";
import Breadcrumb from "../../Component/book/booklisting/Breadcrumb";
import BookGrid from "../../Component/book/booklisting/BookGrid";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getWishlistItem } from "../../feature/wishlist/wishlistAction";

const WishlistPage = () => {
  const { wishlist } = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getWishlistItem());
  }, [dispatch]);



  return (
    <div className="bg-background min-h-screen">
      {/* Wishlist Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {wishlist?.length > 0 ? (
          <BookGrid books={wishlist} viewMode="grid" />
        ) : (
          <div className="flex flex-col items-center justify-center py-20 px-4  rounded-2xl">
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-red-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 
           4.5 0 116.364 6.364L12 21.364l-7.682-7.682a4.5 
           4.5 0 010-6.364z"
                />
              </svg>
            </div>

            <h2 className="text-xl font-semibold text-gray-800">
              Your wishlist is empty
            </h2>
            <p className="text-gray-500 mt-2 text-center max-w-sm">
              Looks like you haven’t added any books yet. Browse our collection
              and save your favorites here!
            </p>

            <Link
              to="/home/books"
              className="mt-6 inline-block px-6 py-3 bg-primary text-white rounded-xl shadow hover:bg-primary/90 transition"
            >
              Browse Books
            </Link>
          </div>
        )}
      </main>
    </div>
  );
};

export default WishlistPage;
