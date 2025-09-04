// src/components/BookListing/BookGrid.jsx
import React from "react";
import BookCard from "./BookCard";
import { BookOpen } from "lucide-react";

const BookGrid = ({ books, viewMode }) => {
  if (books.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-12 text-center">
        <BookOpen className="h-16 w-16 text-muted mx-auto mb-4" />
        <h3 className="text-xl font-medium text-primary mb-2">
          No books found
        </h3>
        <p className="text-muted max-w-md mx-auto">
          Try adjusting your filters to find what you're looking for.
        </p>
      </div>
    );
  }

  return (
    // Example parent component grid layout
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 p-4">
      {books.map((book) => (
        <BookCard key={book._id} book={book} />
      ))}
    </div>
  );
};

export default BookGrid;
