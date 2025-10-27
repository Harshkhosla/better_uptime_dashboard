import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { getStoredToken, isValidToken } from "common/common";
interface User {
  id?: string;
  email: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  userDetails: UserDetails | null;
}

interface UserDetails {
  weight: number;
  bmi: number;
  height: number;
  preferences: string;
  age: number;
  id?: string;
}

const storedToken = getStoredToken();
const isTokenValid = isValidToken(storedToken);

const initialState: AuthState = {
  user: null,
  token: typeof window !== "undefined" ? localStorage.getItem("token") : null,
  isAuthenticated: isTokenValid,
  loading: false,
  error: null,
  userDetails: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{
        token?: string;
        user?: { id: string; email: string; name?: string };
        userDetails?: UserDetails;
      }>,
    ) => {
      if (action.payload.token) {
        state.token = action.payload.token;
        state.isAuthenticated = true;
        if (typeof window !== "undefined") {
          localStorage.setItem("token", action.payload.token);
        }
      }
      if (action.payload.user) {
        state.user = action.payload.user;
      }
      if (action.payload.userDetails) {
        state.userDetails = action.payload.userDetails;
      }
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      if (typeof window !== "undefined") {
        localStorage.removeItem("token");
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const { setCredentials, logout, setLoading, setError, clearError } =
  authSlice.actions;
export default authSlice.reducer;
