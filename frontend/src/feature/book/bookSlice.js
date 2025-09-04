import { createSlice } from "@reduxjs/toolkit";
import {
  createBook,
  deleteBook,
  getBookById,
  getBooks,
  getBooksByCategory,
  updateBook,
} from "./bookAction";
const initialState = {
  book: null,
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
      state.success = true;
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
      state.book = action.payload;
      state.error = null;
    });
    builder.addCase(getBookById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    });

    // get books
    builder.addCase(getBooks.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    });
    builder.addCase(getBooks.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.book = action.payload;
      state.error = null;
    });
    builder.addCase(getBooks.rejected, (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.payload;
    });

    // get books by category
    builder.addCase(getBooksByCategory.pending, (state)=>{
      state.loading = true;
      state.error = null;
      state.success = false;
    })
    builder.addCase(getBooksByCategory.fulfilled, (state, action)=>{
      state.loading = false;
      state.success = true;
      state.book = action.payload;
      state.error = null;
    })
  },
});

export const { clearBookState } = bookSlice.actions;
export default bookSlice.reducer;
