import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../api/axiosInstance";

// create review
export const createReview = createAsyncThunk(
  "review/create",
  async ({ slug, rating, comment }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`/review/book/${slug}`, {
        rating,
        comment,
      });

      console.log("create review schema:: ", response.data.data);

      // check response status
      if (!response.data?.success) {
        return rejectWithValue(
          response.data?.message || "Failed to delete review"
        );
      }

      return response.data;
    } catch (error) {
      console.error("Delete review error:", error);
      return rejectWithValue(
        error.response?.data?.message || "Failed to create review"
      );
    }
  }
);

// get reviews for specific book
export const getReviewsByBookId = createAsyncThunk(
  "review/getByBookId",
  async ({ slug, page = 1, limit = 10 }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `/review/book/${slug}?page=${page}&limit=${limit}`
      );

      console.log("Get reviews by book id:: ", response.data);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch reviews"
      );
    }
  }
);

// get current user's reviews
export const getMyReviews = createAsyncThunk(
  "review/getMyReviews",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/review/my-reviews");
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch your reviews"
      );
    }
  }
);

// update review
export const updateReview = createAsyncThunk(
  "review/update",
  async ({ reviewId, rating, comment }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/review/${reviewId}`, {
        rating,
        comment,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update review"
      );
    }
  }
);

// delete review
export const deleteReview = createAsyncThunk(
  "review/delete",
  async ({ reviewId }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`/review/${reviewId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete review"
      );
    }
  }
);

// get all reviews for testimonial

export const getTestimonialReviews = createAsyncThunk(
  "reviews/getTestimonial",
  async ({ currentPage }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `/review/allReview?p=${currentPage}`
      );

      console.log("Testimonial Review:: ", response);

      if (!response?.data?.success) {
        return rejectWithValue(response?.data?.message);
      }

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);
