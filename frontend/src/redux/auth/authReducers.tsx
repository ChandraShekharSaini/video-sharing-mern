import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";

import backendApi from "../../api/backendApi";
import { Toaster, toast } from "sonner";
import axios from "axios";
import { FaS } from "react-icons/fa6";
import type { GiReturnArrow } from "react-icons/gi";

interface User {
  _id: string;
  email: string;
  name?: string;
  token: string;
  uploadCount: number;
  downloadCount: number;
}

export interface AuthState {
  loggedInUser: User | null;
  loading: boolean;
}

export interface SignUpPayload {
  email: string;
  password: string;
}

export interface SignInPayload {
  email: string;
  password: string;
}

interface AuthResponse {
  success: boolean;
  message: string;
  user?: User;
}

const initialState: AuthState = {
  loggedInUser: null,
  loading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signInUser.pending, (state) => {
        state.loading = true;
      })

      .addCase(signInUser.fulfilled, (state, action) => {
        state.loading = false;
      })

      .addCase(signInUser.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const signUpUser = createAsyncThunk<
  void,
  SignUpPayload,
  { rejectValue: string }
>("/auth/sign-up-user", async (payload) => {
  console.log(payload);
  try {
    const { data } = await backendApi.post<AuthResponse>(
      "/api/v1/auth/sign-up",
      payload
    );

    if (data.success) {
      console.log(data);
      toast.success(data.message);
    } else {
      console.log(data.message);
      toast.warning(data.message);
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.response?.data?.message);
      toast.warning(error.response?.data?.message ?? error.message);
    } else {
      toast.warning("Something went wrong");
    }
  }
});

export const signInUser = createAsyncThunk<
  string | null,
  SignInPayload,
  { rejectValue: string }
>("/api/v1/auth/sign-in-user", async (payload, thunkApi) => {
  try {
    const { data } = await backendApi.post<AuthResponse>(
      "/api/v1/auth/sign-in",
      payload
    );

    if (data.success && data.user?.token) {
      console.log(data);
      if (data.user.token) {
        toast.success(data.message);
        localStorage.setItem("token", data.user.token);
      }

      return data.user.token || null;
    } else {
      console.log(data);
      toast.warning(data.message);
      return thunkApi.rejectWithValue(data.message);
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error);
      toast.warning(error.response?.data?.message ?? error.message);
      return thunkApi.rejectWithValue(
        error.response?.data?.message ?? error.message
      );
    } else {
      toast.warning("Something Went Wrong");
      return thunkApi.rejectWithValue("Something Went Wrong");
    }
  }
});

export const {} = authSlice.actions;
export default authSlice.reducer;
export const selectLoggedInUser = (state: RootState) => state.auth.loggedInUser;
export const selectLoading = (state: RootState) => state.auth.loading;
