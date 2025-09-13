import React from "react";

const BookTableSkeleton = () => {
  return (
    <div className="overflow-x-auto rounded-lg border shadow-sm">
      <div className="min-w-full inline-block align-middle">
        <div className="overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {[
                  "Cover",
                  "Title",
                  "Author",
                  "Category",
                  "Price",
                  "Stock",
                  "Actions",
                ].map((head, i) => (
                  <th
                    key={i}
                    className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sm:px-4"
                  >
                    {head}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {[...Array(5)].map((_, i) => (
                <tr key={i} className="animate-pulse">
                  {/* Cover */}
                  <td className="px-3 py-3 sm:px-4">
                    <div className="w-10 h-10 bg-gray-200 rounded"></div>
                  </td>
                  {/* Title */}
                  <td className="px-3 py-3 sm:px-4">
                    <div className="h-4 bg-gray-200 rounded w-24 sm:w-40"></div>
                  </td>
                  {/* Author */}
                  <td className="px-3 py-3 hidden sm:table-cell">
                    <div className="h-4 bg-gray-200 rounded w-20"></div>
                  </td>
                  {/* Category */}
                  <td className="px-3 py-3 hidden md:table-cell">
                    <div className="h-4 bg-gray-200 rounded w-20"></div>
                  </td>
                  {/* Price */}
                  <td className="px-3 py-3">
                    <div className="h-4 bg-gray-200 rounded w-12"></div>
                  </td>
                  {/* Stock */}
                  <td className="px-3 py-3">
                    <div className="h-5 bg-gray-200 rounded w-10"></div>
                  </td>
                  {/* Actions */}
                  <td className="px-3 py-3 sm:px-4 text-right">
                    <div className="flex justify-end space-x-2">
                      <div className="w-5 h-5 bg-gray-200 rounded-full"></div>
                      <div className="w-5 h-5 bg-gray-200 rounded-full"></div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BookTableSkeleton;
