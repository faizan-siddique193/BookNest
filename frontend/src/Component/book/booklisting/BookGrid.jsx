// src/components/BookListing/BookGrid.jsx
import React from "react";
import BookCard from "./BookCard";
import { BookOpen } from "lucide-react";

const BookGrid = ({ books, viewMode, className }) => {
  

  return (
    // Example parent component grid layout
    <div
      className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 p-4 ${className}`}
    >
      {books.map((book) => (
        <BookCard key={book._id} book={book} />
      ))}
    </div>
  );
};

export default BookGrid;
