// src/pages/BookListingPage.jsx
import React, { useState, useEffect } from "react";
import Breadcrumb from "../../Component/book/booklisting/Breadcrumb";
import BookGrid from "../../Component/book/booklisting/BookGrid";
import Pagination from "../../Component/book/booklisting/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { getBooks } from "../../feature/book/bookAction";
import { toast } from "react-toastify";
import { BookCardSkeleton } from "../../Component";
const BookListingPage = () => {
  const [viewMode, setViewMode] = useState("grid");
  const dispatch = useDispatch();
  const { loading, currentPage, books, totalPages } = useSelector(
    (state) => state.book
  );
  
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        await dispatch(getBooks({ currentPage })).unwrap();
      } catch (error) {
        toast.error("Something went wrong while getting books");
      }
    };

    fetchBooks();
  }, [dispatch, currentPage]);

  const categories = [
    "Programming Languages",
    "Web Development",
    "Data Science & AI",
    "Cybersecurity & Networking",
    "Cloud & DevOps",
    "Computer Science Fundamentals",
  ];

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mx-auto">
        {[...Array(4)].map((_, idx) => (
          <BookCardSkeleton key={idx} />
        ))}
      </div>
    );
  }
  return (
    <div className="bg-background min-h-screen">
      {/* Page Header */}
      <div className="text-primary pl-10 pt-4 ">
        <Breadcrumb
          items={[
            { label: "Home", path: "/home" },
            { label: "Books", path: "/home/books" },
          ]}
        />
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* TODO: Filters Sidebar */}
          {/*  <FiltersSidebar
            categories={categories}
            filters={filters}
            onFilterChange={handleFilterChange}
          /> */}

          {/* Main Content */}
          <div className="flex-1">
            {/* TODO: SORTBAR */}
            {/*  {
              <SortBar
                totalItems={totalItems}
                sortOption={sortOption}
                viewMode={viewMode}
                onSortChange={setSortOption}
                onViewChange={setViewMode}
              />
            } */}

            <BookGrid books={books} viewMode={viewMode} />

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={(page) => dispatch(getBooks({ currentPage: page }))}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default BookListingPage;
