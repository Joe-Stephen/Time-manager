import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";

const logSlice = createSlice({
  name: "initialLogIn",
  initialState: { initialLogin: false, lastLoginDate: null },
  reducers: {
    setInitialLogin: (state, action) => {
      if (!state.lastLoginDate) {
        state.initialLogin = true;
        state.lastLoginDate = action.payload;
      } else if (!moment(state.lastLoginDate).isSame(moment(), "day")) {
        state.initialLogin = true;
      }
    },
    resetInitialLogin: (state) => {
      state.initialLogin = false;
    },
  },
});

export const { setInitialLogin, resetInitialLogin } = logSlice.actions;
export default logSlice.reducer;
