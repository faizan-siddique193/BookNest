import React from "react";

const BookCardSkeleton = () => (
  <div className="group relative bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 animate-pulse">
    <div className="absolute top-3 left-3 h-5 w-16 bg-gray-200 rounded-full"></div>
    <div className="relative aspect-[2/3] bg-gray-200 overflow-hidden"></div>
    <div className="p-5 space-y-3">
      <div className="h-5 w-3/4 bg-gray-200 rounded"></div>
      <div className="h-4 w-1/2 bg-gray-200 rounded"></div>
      <div className="flex items-center space-x-1">
        {[...Array(5)].map((_, star) => (
          <div key={star} className="h-4 w-4 bg-gray-300 rounded"></div>
        ))}
        <div className="h-4 w-6 bg-gray-200 rounded ml-2"></div>
      </div>
      <div className="flex justify-between items-center">
        <div className="h-5 w-16 bg-gray-200 rounded"></div>
        <div className="h-5 w-5 bg-gray-200 rounded"></div>
      </div>
    </div>
  </div>
);

export default BookCardSkeleton;
