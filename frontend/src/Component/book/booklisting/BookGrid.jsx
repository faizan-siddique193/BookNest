import React from "react";
import BookCard from "./BookCard";

const BookGrid = ({ books, viewMode, className, user }) => {
  const isListView = viewMode === "list";

  return (
    <div
      className={`grid gap-6 p-4 ${
        isListView
          ? "grid-cols-1"
          : "grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
      } ${className || ""}`}
    >
      {Array.isArray(books) ? (
        books.map((book) => (
          <BookCard
            key={book._id}
            book={book}
            viewMode={viewMode}
            user={user}
          />
        ))
      ) : (
        <p>No books found or invalid data format.</p>
      )}
    </div>
  );
};

export default BookGrid;
