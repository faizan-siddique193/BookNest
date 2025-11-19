import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Award, Star, Shield } from "lucide-react";
import { useSelector } from "react-redux";

const HeroSection = () => {
  const { featuredBooks } = useSelector((state) => state.book);

  // pick up to 3 random unique books from featuredBooks
  const randomBooks = useMemo(() => {
    const arr = Array.isArray(featuredBooks) ? featuredBooks.slice() : [];
    if (arr.length === 0) return [];
    // Fisher-Yates shuffle (in-place on copy)
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr.slice(0, Math.min(3, arr.length));
  }, [featuredBooks]);

  // positions / transforms for the 3 stacked cards
  const cardClasses = [
    "absolute bottom-8 left-8 w-48 h-64 bg-white rounded-lg shadow-lg transform -rotate-6 border-2 border-white overflow-hidden",
    "absolute bottom-12 left-24 w-48 h-64 bg-white rounded-lg shadow-lg transform rotate-2 border-2 border-white overflow-hidden z-10",
    "absolute bottom-10 right-8 w-48 h-64 bg-white rounded-lg shadow-lg transform rotate-6 border-2 border-white overflow-hidden",
  ];

  return (
    <section className="relative bg-background overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[url('https://assets.website-files.com/5e51b3b0337309d672efd94c/5e51b3b03373093d1a2efd9d_pattern-grey.svg')]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="relative z-10">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary leading-tight mb-6">
              Discover Your Next{" "}
              <span className="text-accent">Favorite Book</span>
            </h1>

            <p className="text-lg text-muted mb-8 max-w-lg">
              Explore our vast collection of books across all genres. From
              timeless classics to modern bestsellers, find the perfect read for
              every mood.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <Link
                to="/books"
                className="bg-accent hover:bg-accent/90 text-secondary font-medium py-3 px-6 rounded-full flex items-center justify-center transition-colors shadow-md"
              >
                Browse Collection <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-4 max-w-md">
              <div className="flex items-center">
                <BookOpen className="h-5 w-5 text-accent mr-2" />
                <span className="text-sm text-muted">100,000+ Titles</span>
              </div>
              <div className="flex items-center">
                <Award className="h-5 w-5 text-accent mr-2" />
                <span className="text-sm text-muted">Award Winners</span>
              </div>
              <div className="flex items-center">
                <Star className="h-5 w-5 text-accent mr-2" />
                <span className="text-sm text-muted">5-Star Reviews</span>
              </div>
              <div className="flex items-center">
                <Shield className="h-5 w-5 text-accent mr-2" />
                <span className="text-sm text-muted">Secure Checkout</span>
              </div>
            </div>
          </div>

          {/* Right content - Book showcase */}
          <div className="relative">
            <div className="relative w-full h-96 md:h-[500px] bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl overflow-hidden shadow-xl">
              {randomBooks.length > 0 ? (
                randomBooks.map((book, idx) => {
                  const cls =
                    cardClasses[idx] || cardClasses[cardClasses.length - 1];
                  const bookId = book._id || book.id || book.slug || idx;
                  const img =
                    book.image ||
                    book.cover ||
                    book.thumbnail ||
                    "https://via.placeholder.com/400x600?text=No+Image";
                  const to = book._id
                    ? `/home/book/${book._id}`
                    : book.slug
                    ? `/home/book/${book.slug}`
                    : "/books";

                  return (
                    <Link key={bookId} className={cls + " block"}>
                      <img
                        src={img}
                        alt={book.title || "Book"}
                        className="w-full h-full object-cover"
                      />
                    </Link>
                  );
                })
              ) : (
                <>
                  {/* fallback static stack */}
                  <div className="absolute bottom-8 left-8 w-48 h-64 bg-white rounded-lg shadow-lg transform -rotate-6 border-2 border-white overflow-hidden">
                    <img
                      src="https://m.media-amazon.com/images/I/71tR3ZEQZBL._AC_UF1000,1000_QL80_.jpg"
                      alt="Book cover"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="absolute bottom-12 left-24 w-48 h-64 bg-white rounded-lg shadow-lg transform rotate-2 border-2 border-white overflow-hidden z-10">
                    <img
                      src="https://m.media-amazon.com/images/I/81bsw6fnUiL._AC_UF1000,1000_QL80_.jpg"
                      alt="Book cover"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="absolute bottom-10 right-8 w-48 h-64 bg-white rounded-lg shadow-lg transform rotate-6 border-2 border-white overflow-hidden">
                    <img
                      src="https://m.media-amazon.com/images/I/91Bd5N0EyFL._AC_UF1000,1000_QL80_.jpg"
                      alt="Book cover"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </>
              )}

              {/* Decorative elements */}
              <div className="absolute top-8 right-8 bg-accent/20 w-16 h-16 rounded-full"></div>
              <div className="absolute top-20 left-20 bg-primary/10 w-24 h-24 rounded-full"></div>
            </div>

            {/* Floating badge */}
            <div className="absolute -bottom-6 -right-6 bg-accent text-white px-6 py-3 rounded-full shadow-lg font-medium flex items-center">
              <Star className="h-5 w-5 mr-2 fill-current" />
              Readers' Choice 2025
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
