import { Edit, Trash2 } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
const AdminDataTable = ({ books, handleBookDelete }) => {
  const [bookEditData, setbookEditData] = useState(null);

  const handleEditClick = (book) => {
    setbookEditData(book);
    console.log("Book to edit:", book);
  };

  return (
    <div className="overflow-x-auto rounded-lg border shadow-sm">
      <div className="min-w-full inline-block align-middle">
        <div className="overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sm:px-4"
                >
                  Cover
                </th>
                <th
                  scope="col"
                  className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sm:px-4"
                >
                  Title
                </th>
                <th
                  scope="col"
                  className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell"
                >
                  Author
                </th>
                <th
                  scope="col"
                  className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell"
                >
                  Category
                </th>
                <th
                  scope="col"
                  className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Price
                </th>
                <th
                  scope="col"
                  className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Stock
                </th>
                <th
                  scope="col"
                  className="px-3 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider sm:px-4"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {books &&
                books.map((book) => (
                  <tr key={book.id} className="hover:bg-gray-50">
                    <td className="px-3 py-3 whitespace-nowrap sm:px-4">
                      <img
                        className="w-8 h-8 sm:w-10 sm:h-10 rounded object-cover"
                        src={book?.image}
                        alt="book_thumbnail"
                        loading="lazy"
                      />
                    </td>
                    <td className="px-3 py-3 whitespace-nowrap text-sm font-medium text-gray-900 sm:px-4 max-w-[120px] sm:max-w-[180px] truncate">
                      {book?.title}
                    </td>
                    <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-500 hidden sm:table-cell max-w-[100px] truncate">
                      {book?.author}
                    </td>
                    <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-500 hidden md:table-cell max-w-[100px] truncate">
                      {book?.category}
                    </td>
                    <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-500">
                      ${parseFloat(book?.price || 0).toFixed(2)}
                    </td>
                    <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-500">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                          book?.stock > 10
                            ? "bg-green-100 text-green-800"
                            : book?.stock > 0
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {book?.stock}
                      </span>
                    </td>
                    <td className="px-3 py-3 whitespace-nowrap text-right text-sm font-medium sm:px-4">
                      <Link
                        to={`/admin/books/edit/${book?.slug}`}
                        className="p-1 rounded-full inline-block align-middle "
                       state={{book}}
                      >
                        <Edit className="h-4 w-4 sm:h-5 sm:w-5 text-accent hover:text-green-500 transition-colors duration-300" />
                      </Link>
                      <button
                        className="p-1 rounded-full align-middle"
                        onClick={() => handleBookDelete(book.slug)}
                      >
                        <Trash2 className="h-4 w-4 sm:h-5 sm:w-5 text-accent hover:text-red-500" />
                      </button>
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

export default AdminDataTable;
