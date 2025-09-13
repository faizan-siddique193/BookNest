import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Book, Plus, Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  getBooks,
  deleteBook,
  getBooksForAdmin,
} from "../../feature/book/bookAction";
import { toast } from "react-toastify";
import {
  AdminDataTable,
  BookTableSkeleton,
  Pagination,
} from "../../Component/index";
import { auth } from "../../config/firebase";
import { getIdToken, onAuthStateChanged } from "firebase/auth";
import Swal from "sweetalert2";

const BookManagement = () => {
  const [token, setToken] = useState("");
  const dispatch = useDispatch();

  const { adminBooks, currentPage, totalPages, loading } = useSelector(
    (state) => state.book
  );

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

  // fetch books
  const fetchBooks = useCallback(async () => {
    try {
      await dispatch(getBooksForAdmin({ token, currentPage })).unwrap();
    } catch (error) {
      toast.error("Something went wrong while fetching books");
    }
  }, [dispatch, currentPage]);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  // delete a book
  const handleDelete = useCallback(
    (slug) => {
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
            Swal.fire("Deleted!", "Your book has been deleted.", "success");
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
    },
    [dispatch, token, fetchBooks]
  );

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
          <AdminDataTable books={adminBooks} handleBookDelete={handleDelete} />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => {
              // if you need to trigger page change from Redux
              dispatch(getBooks({ page }));
            }}
          />
        </>
      ) : (
        <BookTableSkeleton />
      )}
    </div>
  );
};

export default BookManagement;
