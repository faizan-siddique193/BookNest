// src/pages/BookListingPage.jsx
import React, { useState, useEffect } from "react";
import Breadcrumb from "../../Component/book/booklisting/Breadcrumb";
import FiltersSidebar from "../../Component/book/booklisting/FiltersSidebar";
import SortBar from "../../Component/book/booklisting/SortBar";
import BookGrid from "../../Component/book/booklisting/BookGrid";
import Pagination from "../../Component/book/booklisting/Pagination";
import { useDispatch } from "react-redux";
import { getBooksByCategory, getBooks } from "../../feature/book/bookAction";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { clearBookState } from "../../feature/book/bookSlice";
import { useCallback } from "react";

const BookListingPage = () => {
  /*  const [filters, setFilters] = useState({
    categories: [],
    priceRange: [0, 100],
    rating: null,
    availability: "all",
    format: "all",
  }); */

  const [viewMode, setViewMode] = useState("grid");
  const [books, setBooks] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const booksFromStore = await dispatch(
          getBooks({ currentPage })
        ).unwrap();
        setBooks(booksFromStore.books || []);
        setTotalPages(booksFromStore.totalPages);
        dispatch(clearBookState());
      } catch (error) {
        toast.error(error?.message || "Failed to load books");
      } /* finally {
        setLoading(false);
      } */
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

  /*  const handleFilterChange = (newFilters) => {
    setFilters({ ...filters, ...newFilters });
    setCurrentPage(1); // Reset to first page when filters change
  }; */

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
              onPageChange={setCurrentPage}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default BookListingPage;
