import React, { useEffect, useState } from "react";
import { Breadcrumb, Pagination } from "../../Component/index";
import { useDispatch, useSelector } from "react-redux";
import { getBooksByCategory } from "../../feature/book/bookAction";
import { toast } from "react-toastify";
import BookGrid from "../../Component/book/booklisting/BookGrid";
import { useParams } from "react-router-dom";

const BooksByCategory = () => {
  const [viewMode, setViewMode] = useState("grid");
  const [books, setBooks] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();

  //   get category from url
  const { category } = useParams();
  // const {} = useSelector((state)=>state.book)
  // fetch books by category
  useEffect(() => {
    const fetchBooksByCategory = async () => {
      try {
        const response = await dispatch(
          getBooksByCategory({ category, currentPage })
        ).unwrap();
        setBooks(response.data.books);
      } catch (error) {
        toast.error(error?.message || "Failed to load books by category");
      }
    };

    fetchBooksByCategory();
  }, [dispatch, currentPage]);
  return (
    <div className="bg-background min-h-screen">
      {/* Page Header */}
      <div className="text-primary pl-10 pt-4 ">
        <Breadcrumb
          items={[
            { label: "Home", path: "/" },
            { label: "Books", path: "/books" },
            { label: "Category", path: "" },
          ]}
        />
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1">
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

export default BooksByCategory;
