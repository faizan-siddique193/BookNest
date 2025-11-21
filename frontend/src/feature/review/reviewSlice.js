import { createSlice } from "@reduxjs/toolkit";
import {
  createReview,
  getReviewsByBookId,
  getMyReviews,
  deleteReview,
  updateReview,
  getTestimonialReviews,
} from "./reviewAction";

// initial state
const initialState = {
  loading: false,
  success: false,
  error: null,
  bookReviews: [],
  userReviews: [],
  testimoniReviews: [],
  totalReviews: 0,
  totalPages: 1,
  currentPage: 1,
  hasMore: true,
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

        // set if current page is one
        if (action.payload.data.pagination.page === 1) {
          state.bookReviews = action.payload.data.reviews;
        } else {
          state.bookReviews = [
            ...state.bookReviews,
            ...action.payload.data.reviews,
          ];
        }
        state.totalReviews = action.payload.data.pagination.totalReviewsCount;
        state.currentPage = action.payload.data.pagination.page;
        state.totalPages = action.payload.data.pagination.pages;
        state.hasMore =
          action.payload.data.pagination.page <
          action.payload.data.pagination.pages;
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
        const deletedId = action.payload.data?.reviewId;

        // Fix: Filter the items array, not the whole object
        if (state.bookReviews) {
          state.bookReviews = state.bookReviews.filter(
            (review) => review._id !== deletedId
          );
        }
        state.totalReviews = Math.max(0, state.totalReviews - 1);
        state.error = null;
      })
      .addCase(deleteReview.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload || "Failed to delete review";
      });

    //  get testimonial reviews

    builder
      .addCase(getTestimonialReviews.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = false;
      })
      .addCase(getTestimonialReviews.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.testimoniReviews = action.payload.data.reviews;
        state.currentPage = action.payload.data.currentPage;
        state.totalPages = action.payload.data.totalPages;
      })
      .addCase(getTestimonialReviews.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload.data.message;
      });
  },
});

export default reivewSlice.reducer;
