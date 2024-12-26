import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
  name: "general",
  initialState: { isLoggedIn: localStorage.getItem("isLoggedIn") === "true" },
  reducers: {
    toggleLoggedInStatus: (state) => {
      state.isLoggedIn = !state.isLoggedIn;

      // Save login status to localStorage
      localStorage.setItem("isLoggedIn", state.isLoggedIn.toString());
    },
  },
});

export const { toggleLoggedInStatus } = appSlice.actions;
export default appSlice.reducer;
