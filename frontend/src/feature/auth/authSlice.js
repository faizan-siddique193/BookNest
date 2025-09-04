import { createSlice } from "@reduxjs/toolkit";
import { userSignIn, userSignUp, googleSignIn, userLogout } from "./authAction";

// Initial state for auth

const initialState = {
  user: null,
  signUp: {
    loading: false,
    error: null,
    success: false,
  },
  signIn: {
    loading: false,
    error: null,
    success: false,
  },
  signInWithGoogle: {
    loading: false,
    error: null,
    success: false,
  },
};

// auth Slice

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearSignUpAuthState: (state) => {
      state.signUp = { loading: false, success: false, error: null };
    },
    clearSignInAuthState: (state) => {
      state.signIn = { loading: false, success: false, error: null };
    },
    clearSignInWithGoogleAuthState: (state) => {
      state.signInWithGoogle = { loading: false, success: false, error: null };
    },
  },
  extraReducers: (builder) => {
    // Handle user sign-up
    builder.addCase(userSignUp.pending, (state) => {
      state.signUp.loading = true;
      state.signUp.success = false;
      state.signUp.error = false;
    });
    builder.addCase(userSignUp.fulfilled, (state, action) => {
      state.signUp.loading = false;
      state.user = action.payload;
      state.signUp.success = true;
      state.signUp.error = null;
    });
    builder.addCase(userSignUp.rejected, (state, action) => {
      state.signUp.loadingloading = false;
      state.signUp.error = action.payload;
      state.signUp.success = false;
    });
    // Handle user sign-in
    builder.addCase(userSignIn.pending, (state) => {
      state.signIn.loading = true;
      state.signIn.error = null;
      state.signIn.success = false;
    });
    builder.addCase(userSignIn.fulfilled, (state, action) => {
      state.signIn.loading = false;
      // state.user = action.payload;
      state.signIn.success = true;
      state.signIn.error = null;
      // state.isAuthenticated = true;
    });
    builder.addCase(userSignIn.rejected, (state, action) => {
      state.signIn.loading = false;
      state.signIn.error = action.payload;
      state.signIn.success = false;
    });

    // Handle Google Sign-In
    builder.addCase(googleSignIn.pending, (state) => {
      state.signInWithGoogle.loading = true;
      state.signInWithGoogle.error = null;
      state.signInWithGoogle.success = false;
    });
    builder.addCase(googleSignIn.fulfilled, (state, action) => {
      state.signInWithGoogle.loading = false;
      state.user = action.payload;
      state.signInWithGoogle.success = true;
      state.signInWithGoogle.error = null;
      state.isAuthenticated = true;
    });
    builder.addCase(googleSignIn.rejected, (state, action) => {
      state.signInWithGoogle.loading = false;
      state.signInWithGoogle.error = action.payload;
      state.signInWithGoogle.success = false;
    });

    // singout

    builder.addCase(userLogout.pending, (state) => {
      state.signIn.loading = true;
      state.signIn.error = null;
      state.signIn.success = false;
    });
    builder.addCase(userLogout.fulfilled, (state, action) => {
      state.signIn.loading = false;
      // state.user = action.payload;
      state.signIn.success = true;
      state.signIn.error = null;
      // state.isAuthenticated = true;
    });
    builder.addCase(userLogout.rejected, (state, action) => {
      state.signIn.loading = false;
      state.signIn.error = action.payload;
      state.signIn.success = false;
    });
  },
});

export const {
  clearSignInAuthState,
  clearSignUpAuthState,
  clearSignInWithGoogleAuthState,
} = authSlice.actions;
export default authSlice.reducer;
