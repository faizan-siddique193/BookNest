import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigater from "../Component/Navigater";
import SpinerLoader from "../Component/SpinerLoader";
import { useSnackbar } from "notistack";
import { FiBook, FiUser, FiCalendar } from "react-icons/fi";

const CreateBook = () => {
  const [title, setTitle] = useState("");
  const [auther, setAuther] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [isloading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { title, auther, publishYear };
    
    setIsLoading(true);
    axios
      .post(`http://localhost:8080/api/v1/books/book/add`, data)
      .then(() => {
        enqueueSnackbar('Book created successfully', { variant: 'success' });
        navigate("/");
      })
      .catch((error) => {
        enqueueSnackbar('Something went wrong', { variant: 'error' });
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  if (isloading) return <SpinerLoader />;

  return (
    <div className="min-h-screen bg-gray-50 py-4 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="mb-4">
          <Navigater />
        </div>

        <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md">
          <div className="text-center mb-6">
            <h2 className="text-xl sm:text-2xl font-serif font-medium text-gray-800">
              Add New Book
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiBook className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="title"
                  name="title"
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border-b border-gray-300 focus:border-indigo-500 focus:outline-none focus:ring-0 text-gray-700 placeholder-gray-400"
                  placeholder="Book Title"
                />
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiUser className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="auther"
                  name="auther"
                  type="text"
                  required
                  value={auther}
                  onChange={(e) => setAuther(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border-b border-gray-300 focus:border-indigo-500 focus:outline-none focus:ring-0 text-gray-700 placeholder-gray-400"
                  placeholder="Author Name"
                />
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiCalendar className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="publishyear"
                  name="publishyear"
                  type="number"
                  min="1800"
                  max={new Date().getFullYear()}
                  required
                  value={publishYear}
                  onChange={(e) => setPublishYear(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border-b border-gray-300 focus:border-indigo-500 focus:outline-none focus:ring-0 text-gray-700 placeholder-gray-400"
                  placeholder="Publish Year"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
            >
              Add Book
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateBook;