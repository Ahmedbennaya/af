import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-hot-toast";
import { setCredentials } from "./authSlice";

// Async thunk to sign in the user
export const signin = createAsyncThunk(
  "user/signin",
  async (user, { dispatch, rejectWithValue }) => {
    axios.defaults.withCredentials = true;
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/users/login",
        user
      );
      dispatch(setCredentials(data));
      toast.success("Logged In");
      return data;
    } catch (error) {
      toast.error(error.response.data.message);
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk to sign up the user
export const signUp = createAsyncThunk(
  "user/signup",
  async ({ user, navigate }, { rejectWithValue }) => {
    axios.defaults.withCredentials = true;
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/users/registerUser",
        user
      );
      navigate("/signin");
      toast.success("Account created successfully");
      return data;
    } catch (error) {
      toast.error(error.response.data.message);
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk to log out the user
export const logout = createAsyncThunk(
  "user/logout",
  async (navigate, { rejectWithValue }) => {
    axios.defaults.withCredentials = true;
    try {
      const { data } = await axios.post("http://localhost:5000/api/users/logout");
      navigate("/");
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Async thunk to request a password reset
export const requestPasswordReset = createAsyncThunk(
  "user/requestPasswordReset",
  async (email, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/users/forgot-password",
        { email }
      );
      toast.success("Password reset link sent to your email.");
      return data;
    } catch (error) {
      toast.error(error.response.data.message);
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk to reset the password
export const resetPassword = createAsyncThunk(
  "user/resetPassword",
  async ({ token, password }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `http://localhost:5000/api/users/reset-password/${token}`,
        { password }
      );
      toast.success("Password has been reset successfully.");
      return data;
    } catch (error) {
      toast.error(error.response.data.message);
      return rejectWithValue(error.response.data);
    }
  }
);

// Create userSlice
const userSlice = createSlice({
  name: "user",
  initialState: {},
  extraReducers: (builder) => {
    builder.addCase(signin.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(signin.fulfilled, (state, action) => {
      state.loading = false;
      state.loggedInUser = action.payload;
    });
    builder.addCase(signin.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(signUp.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(signUp.fulfilled, (state, action) => {
      state.loading = false;
      state.createdUser = action.payload;
    });
    builder.addCase(signUp.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(logout.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(logout.fulfilled, (state, action) => {
      state.loading = false;
      state.logoutedUser = action.payload;
    });
    builder.addCase(logout.rejected, (state) => {
      state.loading = false;
    });
    // Handle password reset actions
    builder.addCase(requestPasswordReset.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(requestPasswordReset.fulfilled, (state) => {
      state.loading = false;
      state.passwordResetRequested = true;
    });
    builder.addCase(requestPasswordReset.rejected, (state) => {
      state.loading = false;
      state.passwordResetRequested = false;
    });
    builder.addCase(resetPassword.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(resetPassword.fulfilled, (state) => {
      state.loading = false;
      state.passwordResetSuccessful = true;
    });
    builder.addCase(resetPassword.rejected, (state) => {
      state.loading = false;
      state.passwordResetSuccessful = false;
    });
  },
});

// Export the user reducer as default
export default userSlice.reducer;
