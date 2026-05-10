import React, { useState, useEffect, useCallback, useRef } from "react";
import Breadcrumb from "../../Component/book/booklisting/Breadcrumb";
import BookGrid from "../../Component/book/booklisting/BookGrid";
import Pagination from "../../Component/book/booklisting/Pagination";
import FiltersSidebar from "../../Component/book/booklisting/FiltersSidebar";
import SortBar from "../../Component/book/booklisting/SortBar";
import { useDispatch, useSelector } from "react-redux";
import { getBooks } from "../../feature/book/bookAction";
import { toast } from "react-toastify";
import { BookCardSkeleton } from "../../Component";

const BookListingPage = ({ user }) => {
  const [viewMode, setViewMode] = useState("grid");
  const [sortOption, setSortOption] = useState("newest");
  const [filters, setFilters] = useState({
    categories: [],
    priceRange: [0, 100],
    rating: null,
    availability: "all",
  });
  const [page, setPage] = useState(1);
  const [debouncedFilters, setDebouncedFilters] = useState(filters);
  const dispatch = useDispatch();
  const debounceTimerRef = useRef(null);

  const { loading, userBooks, totalPages, searchItem } = useSelector(
    (state) => state.book,
  );

  // Debounce filter changes (500ms delay)
  useEffect(() => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(() => {
      setDebouncedFilters(filters);
      setPage(1);
    }, 500);

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [filters]);

  // Debounce sort changes
  useEffect(() => {
    setPage(1);
  }, [searchItem, sortOption]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        await dispatch(
          getBooks({
            currentPage: page,
            searchItem,
            categories: debouncedFilters.categories,
            priceRange: debouncedFilters.priceRange,
            sortOption,
            availability: debouncedFilters.availability,
            minRating: debouncedFilters.rating,
          }),
        ).unwrap();
      } catch (error) {
        toast.error("Something went wrong while fetching books");
      }
    };
    fetchBooks();
  }, [dispatch, page, searchItem, debouncedFilters, sortOption]);

  const handleFilterChange = useCallback((updates) => {
    setFilters((prev) => ({ ...prev, ...updates }));
  }, []);

  const categories = [
    { label: "Programming Languages", value: "programming-languages" },
    { label: "Web Development", value: "web-development" },
    { label: "Data Science & AI", value: "data-science-ai" },
    { label: "Cybersecurity & Networking", value: "cybersecurity-networking" },
    { label: "Cloud & DevOps", value: "cloud-devops" },
    {
      label: "Computer Science Fundamentals",
      value: "computer-science-fundamentals",
    },
  ];

  return (
    <div className="bg-background min-h-screen">
      {/* Page Header */}
      <div className="text-primary pl-10 pt-4">
        <Breadcrumb
          items={[
            { label: "Home", path: "/" },
            { label: "Books", path: "/books" },
          ]}
        />
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters Sidebar - Always Show */}
          <FiltersSidebar
            categories={categories}
            filters={filters}
            onFilterChange={handleFilterChange}
          />

          {/* Main Content - Book Grid with Loading State */}
          <div className="flex-1">
            <SortBar
              totalItems={userBooks?.length || 0}
              sortOption={sortOption}
              viewMode={viewMode}
              onSortChange={setSortOption}
              onViewChange={setViewMode}
            />

            {/* Loading Skeleton or Books */}
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...Array(6)].map((_, idx) => (
                  <BookCardSkeleton key={idx} />
                ))}
              </div>
            ) : userBooks && userBooks.length > 0 ? (
              <BookGrid user={user} books={userBooks} viewMode={viewMode} />
            ) : (
              <p className="text-center text-gray-500 mt-10">
                No books found matching your search.
              </p>
            )}

            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default BookListingPage;
