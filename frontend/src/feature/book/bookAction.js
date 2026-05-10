import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../api/axiosInstance";

export const createBook = createAsyncThunk(
  "book/create",
  async (
    {
      token,
      title,
      author,
      description,
      price,
      category,
      averageRating,
      pageCount,
      image,
      stock,
      publishYear,
      isFeatured,
    },
    { rejectWithValue },
  ) => {
    try {
      const response = await axiosInstance.post(
        "/book/create",
        {
          title,
          author,
          description,
          price,
          category,
          averageRating,
          pageCount,
          image,
          stock,
          publishYear,
          isFeatured,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      return response.data; // return so it gets stored in Redux
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);

export const updateBook = createAsyncThunk(
  "book/update",
  async ({ token, slug, updates }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.patch(
        `/book/update/${slug}`,
        {
          updates,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  },
);

export const deleteBook = createAsyncThunk(
  "book/delete",
  async ({ token, slug }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`/book/delete/${slug}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  },
);

// get book by id/slug
export const getBookById = createAsyncThunk(
  "book/getbyid",
  async ({ slug }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/book/getBook/${slug}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  },
);

// get all books
export const getBooks = createAsyncThunk(
  "book/get",
  async (
    {
      currentPage,
      searchItem,
      categories,
      priceRange,
      sortOption,
      availability,
      minRating,
    },
    { rejectWithValue },
  ) => {
    try {
      const params = new URLSearchParams();
      params.set("p", currentPage || 1);

      if (searchItem) {
        params.set("q", searchItem);
      }

      if (Array.isArray(categories) && categories.length > 0) {
        params.set("categories", categories.join(","));
      }

      if (Array.isArray(priceRange) && priceRange.length === 2) {
        params.set("minPrice", priceRange[0]);
        params.set("maxPrice", priceRange[1]);
      }

      if (sortOption) {
        params.set("sort", sortOption);
      }

      if (availability && availability !== "all") {
        params.set("availability", availability);
      }

      if (minRating) {
        params.set("minRating", String(minRating));
      }

      const response = await axiosInstance.get(
        `/book/getbooks?${params.toString()}`,
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  },
);

// get books by category
export const getBooksByCategory = createAsyncThunk(
  "book/bycategory",
  async ({ category, currentPage }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `/book/getbooks/${category}?p=${currentPage}`,
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  },
);

// Get Featured Books
export const getFeaturedBooks = createAsyncThunk(
  "book/getFeaturedBooks",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/book/get/featured");

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch featured books",
      );
    }
  },
);

// Get Latest Books
export const getLatestBooks = createAsyncThunk(
  "book/getLatestBooks",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/book/get/latest");

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch latest books",
      );
    }
  },
);

// get books for admin to manage it
export const getBooksForAdmin = createAsyncThunk(
  "book/getForAdmin",
  async ({ token, currentPage }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `/book/admin/getbooks?p=${currentPage}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  },
);

// Get AI-generated book summary
export const getBookSummary = createAsyncThunk(
  "book/getAISummary",
  async ({ slug }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/ai/summary/${slug}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch book summary",
      );
    }
  },
);
