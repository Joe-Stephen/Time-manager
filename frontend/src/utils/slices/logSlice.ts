import { createSlice } from "@reduxjs/toolkit";
import moment, { Moment } from "moment";

interface LogState {
  initialLogin: boolean;
  lastLoginDate: string | null;
  lastLoginTime: Moment | null;
}

const initialState: LogState = {
  initialLogin: false,
  lastLoginDate: null,
  lastLoginTime: null,
};

const logSlice = createSlice({
  name: "initialLogIn",
  initialState,
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
    setLastLoginTime: (state) => {
      state.lastLoginTime = moment();
    },
  },
});

export const { setInitialLogin, resetInitialLogin } = logSlice.actions;
export default logSlice.reducer;
