import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";

import backendApi from "../../api/backendApi";
import { Toaster, toast } from "sonner";
import axios from "axios";

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

export const {} = authSlice.actions;
export default authSlice.reducer;
export const selectLoggedInUser = (state: RootState) => state.auth.loggedInUser;
export const selectLoading = (state: RootState) => state.auth.loading;
