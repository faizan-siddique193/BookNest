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
        publishYear
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

export const getBooks = createAsyncThunk(
  "book/get",
  async ({ currentPage }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `/book/getbooks?p=${currentPage}`
      );

      // TODO: verify delete book response
      console.log("GetBookBy book response::", response.data.data);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

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

const searchBook = createAsyncThunk();
