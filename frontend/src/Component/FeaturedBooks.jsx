import React from "react";
import { Link } from "react-router-dom";
import { Star, ArrowRight, Bookmark, Zap } from "lucide-react";

const FeaturedBooks = () => {
  const featuredBooks = [
    {
      id: 1,
      title: "The Midnight Library",
      author: "Matt Haig",
      price: 18.99,
      discountPrice: 14.99,
      rating: 4.5,
      cover:
        "https://m.media-amazon.com/images/I/81h2gWPTYJL._AC_UF1000,1000_QL80_.jpg",
      badge: "Bestseller",
    },
    {
      id: 2,
      title: "Atomic Habits",
      author: "James Clear",
      price: 27.99,
      discountPrice: 19.99,
      rating: 4.8,
      cover:
        "https://m.media-amazon.com/images/I/91bYsX41DVL._AC_UF1000,1000_QL80_.jpg",
      badge: "Self-Help",
    },
    {
      id: 3,
      title: "Project Hail Mary",
      author: "Andy Weir",
      price: 28.0,
      discountPrice: null,
      rating: 4.7,
      cover:
        "https://m.media-amazon.com/images/I/91Bd5N0EyFL._AC_UF1000,1000_QL80_.jpg",
      badge: "Sci-Fi",
    },
    {
      id: 4,
      title: "Where the Crawdads Sing",
      author: "Delia Owens",
      price: 17.99,
      discountPrice: 12.99,
      rating: 4.4,
      cover:
        "https://m.media-amazon.com/images/I/81O1oy0y9eL._AC_UF1000,1000_QL80_.jpg",
      badge: "Limited Deal",
    },
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div>
            <h2 className="text-3xl font-bold text-primary mb-2">
              Featured Books
            </h2>
            <p className="text-muted">
              Handpicked selections from our collection
            </p>
          </div>
          <Link
            to="/featured"
            className="flex items-center text-accent font-medium mt-4 md:mt-0 hover:text-primary transition-colors"
          >
            View all featured <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredBooks.map((book) => (
            <div
              key={book.id}
              className="group relative bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden border border-gray-100"
            >
              {/* Book Badge */}
              {book.badge && (
                <div
                  className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-medium z-10 ${
                    book.badge === "Limited Deal"
                      ? "bg-danger text-white"
                      : book.badge === "Bestseller"
                      ? "bg-accent text-white"
                      : "bg-primary text-white"
                  }`}
                >
                  {book.badge}
                </div>
              )}

              {/* Book Cover */}
              <div className="relative aspect-[2/3] bg-gray-100 overflow-hidden">
                <img
                  src={book.cover}
                  alt={book.title}
                  className="w-full h-full object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button className="bg-accent text-white px-4 py-2 rounded-full text-sm font-medium transform translate-y-2 group-hover:translate-y-0 transition-transform">
                    Quick View
                  </button>
                </div>
              </div>

              {/* Book Details */}
              <div className="p-5">
                <h3 className="font-semibold text-primary mb-1 line-clamp-2">
                  {book.title}
                </h3>
                <p className="text-sm text-muted mb-3">{book.author}</p>

                {/* Rating */}
                <div className="flex items-center mb-3">
                  <div className="flex mr-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-4 w-4 ${
                          star <= Math.floor(book.rating)
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-muted">
                    {book.rating.toFixed(1)}
                  </span>
                </div>

                {/* Price */}
                <div className="flex justify-between items-center">
                  <div>
                    {book.discountPrice ? (
                      <>
                        <span className="font-bold text-accent mr-2">
                          ${book.discountPrice.toFixed(2)}
                        </span>
                        <span className="text-sm text-muted line-through">
                          ${book.price.toFixed(2)}
                        </span>
                      </>
                    ) : (
                      <span className="font-bold text-primary">
                        ${book.price.toFixed(2)}
                      </span>
                    )}
                  </div>
                  <button className="text-primary hover:text-accent transition-colors">
                    <Bookmark className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Special Deal Ribbon */}
              {book.badge === "Limited Deal" && (
                <div className="absolute top-0 right-0 bg-accent text-white text-xs font-bold px-3 py-1 transform rotate-45 translate-x-8 -translate-y-1">
                  <Zap className="h-3 w-3 inline mr-1" />
                  DEAL
                </div>
              )}
            </div>
          ))}
        </div>

        {/* View All Button - Mobile Only */}
        <div className="mt-8 text-center md:hidden">
          <Link
            to="/featured"
            className="inline-flex items-center px-6 py-3 border border-primary text-primary rounded-full font-medium hover:bg-primary hover:text-white transition-colors"
          >
            View All Featured
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedBooks;
