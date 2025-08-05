import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface Websites {
  url: string;
  alert: string;
  escalationPolicy: string;
  ownerId: string;
}
interface Webstate {
  websites: Websites[];
  loading: boolean;
  error: string | null;
}
const initialState: Webstate = {
  websites: [],
  loading: false,
  error: null,
};

const webSlice = createSlice({
  name: "web",
  initialState,
  reducers: {
    setWebsites: (state, action: PayloadAction<{ websites: Websites[] }>) => {
      console.log(action.payload, "sdvkjvdskjvdnsvds");
      state.websites = [...action.payload.websites];
    },
  },
});

export const { setWebsites } = webSlice.actions;

export default webSlice.reducer;
