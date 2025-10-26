import { createSlice } from "@reduxjs/toolkit";
import {
  storeRegisterUserInDb,
  getLoginUser,
  getUserProfile,
} from "./userAction";

const initialState = {
  user: null,
  loading: false,
  error: null,
  success: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearUserDbState: (state) => {
      state.loading = false;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(storeRegisterUserInDb.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(storeRegisterUserInDb.fulfilled, (state, action) => {
        state.loading = false;
        // state.user = action.payload;
        state.success = true;
      })
      .addCase(storeRegisterUserInDb.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      });
      
    // get user profile
    builder.addCase(getUserProfile.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    });
    builder.addCase(getUserProfile.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.user = action.payload;
    });
    builder.addCase(getUserProfile.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    });
  },
});

export const { clearUserDbState } = userSlice.actions;
export default userSlice.reducer;
