import React, { useEffect, useState } from "react";
import { Breadcrumb, EmptyState, Pagination } from "../../Component/index";
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

  console.log("Books in category:: ", books);

  //   get category from url
  const { category } = useParams();
  useEffect(() => {
    const fetchBooksByCategory = async () => {
      try {
        const response = await dispatch(
          getBooksByCategory({ category, currentPage })
        ).unwrap();
        setBooks(response.data.books);
      } catch (error) {}
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
        {books.length > 0 ? (
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-1">
              <BookGrid books={books} viewMode={viewMode} />
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          </div>
        ) : (
          <EmptyState />
        )}
      </main>
    </div>
  );
};

export default BooksByCategory;
