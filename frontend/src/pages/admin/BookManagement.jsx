import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Book, Plus, Search, Loader2, Loader } from "lucide-react";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { getBooks } from "../../feature/book/bookAction";
import { toast } from "react-toastify";
import { clearBookState } from "../../feature/book/bookSlice";
import { AdminDataTable, Pagination } from "../../Component/index";
import { auth } from "../../config/firebase";
import { getIdToken, onAuthStateChanged } from "firebase/auth";
import Swal from "sweetalert2";
import { deleteBook } from "../../feature/book/bookAction";
const BookManagement = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [token, setToken] = useState("");

  // fetch books
  let fetchBooks;
  useEffect(() => {
    fetchBooks = async () => {
      try {
        const booksFromStore = await dispatch(
          getBooks({ currentPage })
        ).unwrap();
        setBooks(booksFromStore.data.books || []);
        setTotalPages(booksFromStore.data.totalPages);
        dispatch(clearBookState());
      } catch (error) {
        toast.error(error?.message || "Failed to load books");
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [dispatch, currentPage]);

  // Get current user token
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const currentUserToken = await getIdToken(user, { forceRefresh: true });
        setToken(currentUserToken);
      }
    });
    return unsubscribe;
  }, []);

  // memoerize a set current page function
  const handlePageChange = useCallback((page) => {
    setCurrentPage(page);
  }, []);

  // delete a book
  const handleDelete = useCallback((slug) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await dispatch(deleteBook({ token, slug })).unwrap();
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
          fetchBooks();
        } catch (error) {
          Swal.fire(
            "Error",
            error?.message || "Failed to delete book",
            "error"
          );
        }
      }
    });
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div className="flex items-center gap-3">
          <Book className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-bold text-gray-800">Book Management</h1>
        </div>

        <div className="flex gap-3 w-full sm:w-auto">
          <Link
            to="/admin/books/add"
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors whitespace-nowrap"
          >
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">Add Book</span>
          </Link>
        </div>
      </div>

      {/* main content */}
      {!loading ? (
        <>
          <AdminDataTable books={books} handleBookDelete={handleDelete} />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      ) : (
        <Loader2 className="animate-spin m-auto text-accent" />
      )}
    </div>
  );
};

export default BookManagement;
