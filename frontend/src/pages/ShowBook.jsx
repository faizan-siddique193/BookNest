import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Navigater from "../Component/Navigater";
import SpinerLoader from "../Component/SpinerLoader";
import { FiBook, FiUser, FiCalendar, FiClock, FiEdit } from "react-icons/fi";
import { useSnackbar } from "notistack";
import { Link } from "react-router-dom";

const ShowBook = () => {
  const [book, setBook] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const fetchBook = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`http://localhost:8080/api/v1/books/book/${id}`);
        setBook(response.data.data);
      } catch (error) {
        console.error("Error fetching book:", error);
        enqueueSnackbar('Failed to load book details', { variant: 'error' });
      } finally {
        setIsLoading(false);
      }
    };
    fetchBook();
  }, [id, enqueueSnackbar]);

  if (isLoading) return <SpinerLoader />;
  if (!book) return null;

  return (
    <div className="min-h-screen bg-gray-50 py-4 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-4">
          <Navigater />
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-indigo-50 px-4 sm:px-6 py-4 border-b border-indigo-100 flex justify-between items-center">
            <h2 className="text-lg sm:text-xl font-serif font-medium text-gray-800">
              Book Details
            </h2>
            <Link
              to={`/books/edit/${book._id}`}
              className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <FiEdit className="mr-1" />
              Edit
            </Link>
          </div>

          <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
            <div className="flex items-start">
              <div className="flex-shrink-0 h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                <FiBook className="h-4 w-4 sm:h-5 sm:w-5" />
              </div>
              <div className="ml-3 sm:ml-4">
                <h3 className="text-sm font-medium text-gray-500">Title</h3>
                <p className="text-base sm:text-lg font-serif text-gray-900">{book.title}</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                <FiUser className="h-4 w-4 sm:h-5 sm:w-5" />
              </div>
              <div className="ml-3 sm:ml-4">
                <h3 className="text-sm font-medium text-gray-500">Author</h3>
                <p className="text-base sm:text-lg text-gray-900">{book.auther}</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                <FiCalendar className="h-4 w-4 sm:h-5 sm:w-5" />
              </div>
              <div className="ml-3 sm:ml-4">
                <h3 className="text-sm font-medium text-gray-500">Publish Year</h3>
                <p className="text-base sm:text-lg text-gray-900">{book.publishYear}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 pt-4 border-t border-gray-200">
              <div className="flex items-start">
                <div className="flex-shrink-0 h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600">
                  <FiClock className="h-4 w-4 sm:h-5 sm:w-5" />
                </div>
                <div className="ml-3 sm:ml-4">
                  <h3 className="text-sm font-medium text-gray-500">Created At</h3>
                  <p className="text-xs sm:text-sm text-gray-500">
                    {new Date(book.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600">
                  <FiClock className="h-4 w-4 sm:h-5 sm:w-5" />
                </div>
                <div className="ml-3 sm:ml-4">
                  <h3 className="text-sm font-medium text-gray-500">Updated At</h3>
                  <p className="text-xs sm:text-sm text-gray-500">
                    {new Date(book.updatedAt).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowBook;