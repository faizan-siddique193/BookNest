import { createSlice } from "@reduxjs/toolkit";
import {
  createReview,
  getReviewsByBookId,
  getMyReviews,
  deleteReview,
  updateReview,
} from "./reviewAction";

// initial state
const initialState = {
  loading: false,
  success: false,
  error: null,
  bookReviews: [],
  userReviews: [],
  totalReviews: null,
  totalPages: 1,
  currentPage: 1,
};

const reivewSlice = createSlice({
  name: "review",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // create reivews
    builder
      .addCase(createReview.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(createReview.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.bookReviews.unshift(action.payload.data || action.payload);
      })
      .addCase(createReview.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload || "Failed to create review";
      });

    // Get Reviews by Book ID
    builder
      .addCase(getReviewsByBookId.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(getReviewsByBookId.fulfilled, (state, action) => {
        state.loading = false;
        state.bookReviews = action.payload.data;
        state.totalReviews = action.payload.total;
        state.currentPage = action.payload.page;
        state.totalPages = action.payload.currentPage;
      })
      .addCase(getReviewsByBookId.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      });

    // Get My Reviews
    builder
      .addCase(getMyReviews.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(getMyReviews.fulfilled, (state, action) => {
        state.loading = false;
        state.userReviews = action.payload.data;
        state.currentPage = action.payload.data.currentPage;
        state.totalPages = action.payload.data.totalPages;
      })
      .addCase(getMyReviews.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload || "Failed to fetch your reviews";
      });

    // Update Review
    builder
      .addCase(updateReview.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(updateReview.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        const updatedReview = action.payload.data;
        // find and update in bookReviews
        const reviewIdex = state.bookReviews.findIndex(
          (prevReview) => prevReview._id === updatedReview._id
        );

        if (reviewIdex !== -1) {
          state.bookReviews[reviewIdex] = updatedReview;
        }

        // find and update in userReviews
        const userIdex = state.userReviews.findIndex(
          (prevReview) => prevReview._id === updatedReview._id
        );

        if (userIdex !== -1) {
          state.userReviews[userIdex] = updatedReview;
        }
      })
      .addCase(updateReview.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload || "Failed to update review";
      });

    // Delete Review
    builder
      .addCase(deleteReview.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(deleteReview.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        const deletedId = action.payload.data?._id;
        // remove from bookReviews
        state.bookReviews = state.bookReviews.filter(
          (review) => review._id !== deletedId
        );
        // remove from userReviews
        state.userReviews = state.userReviews.filter(
          (review) => review._id !== deletedId
        );

        state.totalReviews = Math.max(0, state.totalReviews - 1);
      })
      .addCase(deleteReview.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload || "Failed to delete review";
      });
  },
});

export default reivewSlice.reducer;
