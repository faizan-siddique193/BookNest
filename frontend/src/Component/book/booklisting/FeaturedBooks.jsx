import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Star, ArrowRight, Bookmark, Zap, Heart } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { getFeaturedBooks } from "../../../feature/book/bookAction";
import { toast } from "react-toastify";
import BookCardSkeleton from "../../BookCardSkeleton";
import BookGrid from "./BookGrid";
const FeaturedBooks = () => {
  const dispatch = useDispatch();
  const { loading, featuredBooks } = useSelector((state) => state.book);

  console.log("Featured Books :: ", featuredBooks);

  useEffect(() => {
    const fetchFeaturedBooks = async () => {
      try {
        await dispatch(getFeaturedBooks()).unwrap();
      } catch (error) {
        throw new Error(error);
      }
    };

    fetchFeaturedBooks();
  }, [dispatch]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {[...Array(4)].map((_, idx) => (
          <BookCardSkeleton key={idx} />
        ))}
      </div>
    );
  }
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
            to="/books/featured"
            className="flex items-center text-primary font-medium mt-4 md:mt-0 hover:text-accent transition-colors group"
          >
            View all featured
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Books Grid */}

        <BookGrid
          className="xl:grid-cols-5"
          books={featuredBooks.slice(0, 5)}
        />

        {/* View All Button - Mobile Only */}
        <div className="mt-8 text-center md:hidden">
          <Link
            to="/books/featured"
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
