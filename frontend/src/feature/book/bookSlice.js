import { createSlice } from "@reduxjs/toolkit";
import {
  createBook,
  deleteBook,
  getBookById,
  getBooks,
  getBooksByCategory,
  updateBook,
  getFeaturedBooks,
  getLatestBooks,
  getBooksForAdmin,
} from "./bookAction";
const initialState = {
  book: null,
  userBooks: [],
  adminBooks: [],
  featuredBooks: [],
  latestBooks: [],
  searchItem: "",
  category: "all",
  priceRange: [0, 100],
  totalPages: 1,
  currentPage: 1,
  loading: false,
  error: null,
  success: false,
};

const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    clearBookState: (state) => {
      state.loading = false;
      state.success = false;
    },

    // ✅ Update search/filter-related states
    setSearchItem: (state, action) => {
      state.searchItem = action.payload;
    },
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    setPriceRange: (state, action) => {
      state.priceRange = action.payload;
    },
    clearFilters: (state) => {
      state.searchItem = "";
      state.category = "all";
      state.priceRange = [0, 100];
    },

    // (other reducers you already have, like fetching books)
    // Example:
    setBooksLoading: (state) => {
      state.loading = true;
    },
    setBooksSuccess: (state, action) => {
      state.loading = false;
      state.success = true;
      state.error = null;
      state.userBooks = action.payload;
    },
    setBooksError: (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createBook.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    });
    builder.addCase(createBook.fulfilled, (state) => {
      state.loading = false;
      state.error = null;
      state.success = true;
    });
    builder.addCase(createBook.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    });

    // update book
    builder.addCase(updateBook.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    });
    builder.addCase(updateBook.fulfilled, (state) => {
      state.loading = false;
      state.error = null;
      state.success = true;
    });
    builder.addCase(updateBook.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    });

    // delete book
    builder.addCase(deleteBook.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    });
    builder.addCase(deleteBook.fulfilled, (state) => {
      state.loading = false;
      state.error = null;
      state.success = true;
    });
    builder.addCase(deleteBook.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    });

    // get book by id
    builder.addCase(getBookById.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    });

    builder.addCase(getBookById.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.book = action.payload.data.book;
      state.error = null;
    });
    builder.addCase(getBookById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    });

    // get all  books
    builder.addCase(getBooks.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    });
    builder.addCase(getBooks.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.userBooks = action.payload.data.books;
      state.currentPage = action.payload.data.currentPage;
      state.totalPages = action.payload.data.totalPages;
      state.error = null;
    });
    builder.addCase(getBooks.rejected, (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.payload;
    });

    // get books by category
    builder.addCase(getBooksByCategory.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    });
    builder.addCase(getBooksByCategory.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.userBooks = action.payload.data.books;
      state.currentPage = action.payload.data.currentPage;
      state.totalPages = action.payload.data.totalPages;
      state.error = null;
    });

    // Featured Books
    builder
      .addCase(getFeaturedBooks.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(getFeaturedBooks.fulfilled, (state, action) => {
        state.loading = false;
        state.featuredBooks = action.payload.data;
        state.success = true;
      })
      .addCase(getFeaturedBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      });

    // Latest Books
    builder
      .addCase(getLatestBooks.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(getLatestBooks.fulfilled, (state, action) => {
        state.loading = false;
        state.latestBooks = action.payload.data;
        state.success = true;
      })
      .addCase(getLatestBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      });

    // get books for admin to manage it
    builder.addCase(getBooksForAdmin.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    });
    builder.addCase(getBooksForAdmin.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.adminBooks = action.payload.data.books;
      state.currentPage = action.payload.data.currentPage;
      state.totalPages = action.payload.data.totalPages;
      state.error = null;
    });
    builder.addCase(getBooksForAdmin.rejected, (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.payload;
    });
  },
});

export const {
  clearBookState,
  setSearchItem,
  setCategory,
  setPriceRange,
  clearFilters,
  setBooksLoading,
  setBooksSuccess,
  setBooksError,
} = bookSlice.actions;
export default bookSlice.reducer;
