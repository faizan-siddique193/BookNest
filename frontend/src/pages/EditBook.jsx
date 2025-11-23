import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navigater from "../Component/Navigater";
import SpinerLoader from "../Component/SpinerLoader";
import { useSnackbar } from "notistack";
import { FiBook, FiUser, FiCalendar, FiSave } from "react-icons/fi";

const EditBook = () => {
  const [title, setTitle] = useState("");
  const [auther, setAuther] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const fetchBookData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`http://localhost:8080/api/v1/books/book/${id}`);
        const book = response.data;
        setTitle(book.title);
        setAuther(book.auther);
        setPublishYear(book.publishYear);
      } catch (error) {
        enqueueSnackbar('Failed to load book data', { variant: 'error' });
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBookData();
  }, [id, enqueueSnackbar]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { title, auther, publishYear };
    
    setIsLoading(true);
    axios
      .put(`http://localhost:8080/api/v1/books/book/edit/${id}`, data)
      .then(() => {
        enqueueSnackbar('Book updated successfully', { variant: 'success' });
        navigate("/");
      })
      .catch((error) => {
        enqueueSnackbar('Failed to update book', { variant: 'error' });
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  if (isLoading) return <SpinerLoader />;

  return (
    <div className="min-h-screen bg-gray-50 py-4 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="mb-4">
          <Navigater />
        </div>

        <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md">
          <div className="text-center mb-6">
            <h2 className="text-xl sm:text-2xl font-serif font-medium text-gray-800">
              Edit Book
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
              className="w-full flex justify-center items-center space-x-2 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
            >
              <FiSave />
              <span>Save Changes</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditBook;