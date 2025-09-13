import React from "react";
import { useSelector } from "react-redux";
import { BookCardSkeleton, Breadcrumb } from "../../Component/index";
import BookGrid from "../../Component/book/booklisting/BookGrid";
const LatestBooks = () => {
  const { latestBooks, loading } = useSelector((state) => state.book);

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
            { label: "Home", path: "/home" },
            { label: "Books", path: "/home/books" },
            { label: "Latest", path: "#" },
          ]}
        />
      </div>
      {/* books */}
      <BookGrid books={latestBooks} />
    </div>
  );
};

export default LatestBooks;
