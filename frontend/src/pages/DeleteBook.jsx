import React, { useState } from "react";
import axios from "axios";
import { useSnackbar } from "notistack";
import { MdOutlineDeleteForever, MdOutlineCancel } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import SpinerLoader from "../Component/SpinerLoader";

const DeleteBook = () => {
  const [isloading, setIsLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleDelete = () => {
    setIsLoading(true);
    axios
      .delete(`http://localhost:8080/api/v1/books/book/delete/${id}`)
      .then(() => {
        enqueueSnackbar('Book deleted successfully', { variant: 'success' });
        navigate('/');
      })
      .catch((error) => {
        enqueueSnackbar('Failed to delete book', { variant: 'error' });
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  if (isloading) return <SpinerLoader />;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-6">
      <div className="bg-white rounded-lg shadow-xl overflow-hidden w-full max-w-md">
        <div className="bg-red-50 p-6 flex items-center space-x-3 border-b border-red-100">
          <div className="p-2 rounded-full bg-red-100 text-red-600">
            <MdOutlineDeleteForever className="text-2xl" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-medium text-gray-900">Delete Book</h2>
            <p className="text-sm text-gray-500">This action is permanent</p>
          </div>
        </div>

        <div className="p-6 space-y-4">
          <p className="text-gray-700 text-sm sm:text-base">
            Are you sure you want to delete this book? This action cannot be undone.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-3 pt-4">
            <button
              onClick={() => navigate("/")}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors flex items-center justify-center"
            >
              <MdOutlineCancel className="mr-2" />
              Cancel
            </button>
            <button
              onClick={handleDelete}
              className="px-4 py-2 bg-red-600 text-white rounded-md text-sm font-medium hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors flex items-center justify-center"
            >
              <MdOutlineDeleteForever className="mr-2" />
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteBook;