import React from "react";

const EmptyState = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="bg-gray-100 p-6 rounded-full mb-4">
        <svg
          className="w-10 h-10 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 17v-6a2 2 0 012-2h6"
          />
        </svg>
      </div>

      <h2 className="text-xl font-semibold text-gray-800">
        No Releases Yet
      </h2>

      <p className="text-gray-500 mt-2">
        New updates will appear here once they are published.
      </p>
    </div>
  )};

export default EmptyState;