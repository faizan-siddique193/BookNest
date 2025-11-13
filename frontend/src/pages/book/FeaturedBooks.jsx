import React, { useEffect } from "react";
import BookGrid from "../../Component/book/booklisting/BookGrid";
import { BookCardSkeleton, Breadcrumb } from "../../Component/index";
import {useSelector } from "react-redux";


const FeaturedBooks = () => {
  const { loading, featuredBooks } = useSelector((state) => state.book);



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
    <div className="bg-background min-h-screen">
      <div className="text-primary pl-10 pt-4 mb-10">
        <Breadcrumb
          items={[
            { label: "Home", path: "/" },
            { label: "Books", path: "/books" },
            { label: "Featured", path: "/books/featured" },
          ]}
        />
      </div>
      {/* books */}
      <BookGrid books={featuredBooks} />
    </div>
  );
};

export default FeaturedBooks;
