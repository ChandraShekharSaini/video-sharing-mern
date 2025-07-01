import { configureStore } from "@reduxjs/toolkit";
import authReducers from "../redux/auth/authReducers";

export const store = configureStore({
  reducer: {
    auth: authReducers,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
