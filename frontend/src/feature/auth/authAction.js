import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth, provider } from "../../config/firebase";

export const userSignUp = createAsyncThunk(
  "auth/userSignUp",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      const token = await user.getIdToken();
      return token; // Return the token for further use
    } catch (error) {
      return rejectWithValue({
        code: error.code,
        message: error.message,
      });
    }
  }
);

// signin action

export const userSignIn = createAsyncThunk(
  "auth/userSignIn",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      const token = await user.getIdToken();
      return token;
    } catch (error) {
      return rejectWithValue({
        code: error.code,
        message: error.message,
      });
    }
  }
);

// Google SignIn action
export const googleSignIn = createAsyncThunk("auth/googleSignIn", async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    // const credential = GoogleAuthProvider.credentialFromResult(result);
    // The signed-in user info.

    const user = result.user;
    const token = await user.getIdToken();
    console.log("Get token from google:: ", token);

    return token;
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    throw new Error(`Google sign-in failed: ${errorCode} - ${errorMessage}`);
  }
});

export const userLogout = createAsyncThunk(
  "user/logout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await auth.signOut();
      console.log("Signout response:: ", response);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
