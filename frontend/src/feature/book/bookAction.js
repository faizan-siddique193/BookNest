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
    { rejectWithValue }
  ) => {
    try {
      console.log(
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
        isFeatured
      );

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
        }
      );

      console.log("Create book response:: ", response.data);
      return response.data; // return so it gets stored in Redux
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
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
        }
      );

      //   TODO: verify update book

      console.log("Update book :: ", response);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
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

      // TODO: verify delete book response
      console.log("Delete book response::", response);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

// get book by id/slug
export const getBookById = createAsyncThunk(
  "book/getbyid",
  async ({ slug }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/book/getBook/${slug}`);

      // TODO: verify delete book response
      console.log("GetBookByid book response::", response);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

// get all books
export const getBooks = createAsyncThunk(
  "book/get",
  async ({ currentPage }, { rejectWithValue }) => {
    try {
      console.log("Current Page:: ", currentPage);

      console.log("Thunk is running");

      const response = await axiosInstance.get(
        `/book/getbooks?p=${currentPage}`
      );

      // TODO: verify delete book response
      console.log("GetBookBy book response::", response.data.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

// get books by category
export const getBooksByCategory = createAsyncThunk(
  "book/bycategory",
  async ({ category, currentPage }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `/book/getbooks/${category}?p=${currentPage}`
      );
      console.log("GetBooksByCategory response::", response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

// Get Featured Books
export const getFeaturedBooks = createAsyncThunk(
  "book/getFeaturedBooks",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/book/get/featured");
      // TODO: DELTE THIS COMMENT
      console.log("Featured Books:: ", response.data.data);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch featured books"
      );
    }
  }
);

// Get Latest Books
export const getLatestBooks = createAsyncThunk(
  "book/getLatestBooks",
  async (_, { rejectWithValue }) => {
    console.log("Thunk fired: getLatestBooks");

    try {
      const response = await axiosInstance.get("/book/get/latest");
      // TODO: REMOVE THIS COMMENT
      console.log("latest Books:: ", response.data.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch latest books"
      );
    }
  }
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
        }
      );

      // TODO: verify delete book response
      console.log("GetBookBy book response::", response.data.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);
const searchBook = createAsyncThunk();
