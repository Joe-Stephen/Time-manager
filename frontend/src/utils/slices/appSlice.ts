import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
  name: "general",
  initialState: { isLoggedIn: false },
  reducers: {
    toggleLoggedInStatus: (state) => {
      state.isLoggedIn = !state.isLoggedIn;
    },
  },
});

export const { toggleLoggedInStatus } = appSlice.actions;
export default appSlice.reducer;
