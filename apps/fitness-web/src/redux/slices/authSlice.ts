import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { User, UserDetails } from "../services/api";

type AuthState = {
  token?: string | null;
  user?: User | null;
  userDetails?: UserDetails | null;
};

const initialState: AuthState = {
  token: null,
  user: null,
  userDetails: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{
        token?: string | undefined;
        user?: User | undefined;
        userDetails?: UserDetails | undefined;
      }>,
    ) => {
      if (action.payload.token !== undefined) {
        state.token = action.payload.token;
      }
      if (action.payload.user !== undefined) {
        state.user = action.payload.user;
      }
      if (action.payload.userDetails !== undefined) {
        state.userDetails = action.payload.userDetails;
      }
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
