import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Calendar, Star, ArrowRight } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { getLatestBooks } from "../../../feature/book/bookAction";
import { toast } from "react-toastify";
import BookGrid from "./BookGrid";
import BookCardSkeleton from "../../BookCardSkeleton";
const LatestBooks = () => {
  const { latestBooks, loading } = useSelector((state) => state.book);

  const dispatch = useDispatch();
  useEffect(() => {
    const fetchLatestBooks = async () => {
      try {
        await dispatch(getLatestBooks()).unwrap();
      } catch (error) {
        toast.error("Something went wrong while fetching latest books");
      }
    };

    fetchLatestBooks();
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
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
          <div>
            <div className="flex items-center text-muted mb-2">
              <Calendar className="h-5 w-5 mr-2" />
              <span className="text-sm font-medium">FRESHLY ADDED</span>
            </div>
            <h2 className="text-3xl font-bold text-primary">Latest Releases</h2>
          </div>
          <Link
            to="/home/books/latest"
            className="flex items-center text-primary font-medium mt-4 md:mt-0 hover:text-accent transition-colors group"
          >
            Browse all new arrivals
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Books Grid */}
        <div>
          <BookGrid
            books={Array.isArray(latestBooks) ? latestBooks.slice(0, 5) : []}
          />
        </div>

        {/* Mobile View All Button */}
        <div className="mt-12 text-center md:hidden">
          <Link
            to="/home/books/latest"
            className="inline-flex items-center px-5 py-2.5 border border-primary text-primary rounded-lg font-medium hover:bg-primary hover:text-white transition-colors"
          >
            View All New Releases
          </Link>
        </div>
      </div>
    </section>
  );
};

export default LatestBooks;
