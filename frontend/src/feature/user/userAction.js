import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../api/axiosInstance";
export const storeRegisterUserInDb = createAsyncThunk(
  "user/register",
  async ({ fullName, token }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        "/user/register",
        { fullName },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "An error occurred while registering the user."
      );
    }
  }
);

export const getLoginUser = createAsyncThunk(
  "user/login",
  async ({ token }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        "/user/login",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

// get user profile

export const getUserProfile = createAsyncThunk(
  "user/userProfile",
  async ({ token }, { rejectWithValue }) => {
    try {
      console.log("Fetching user profile...");
      const response = await axiosInstance.get("/user/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("User Profile Response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching profile:", error);
      return rejectWithValue(
        error.response?.data || "An error occurred while fetching the profile."
      );
    }
  }
);

// update user profile
export const updateUserProfile = createAsyncThunk(
  "user/updateProfile",
  async ({ fullName, token }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(
        "/user/profile",
        { fullName },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "An error occurred while updating the profile."
      );
    }
  }
);

// update user avatar
export const updateUserAvatar = createAsyncThunk(
  "user/updateAvatar",
  async ({ avatarFile, token }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("avatar", avatarFile);

      const response = await axiosInstance.put(
        "/user/profile/avatar",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "An error occurred while updating the avatar."
      );
    }
  }
);
