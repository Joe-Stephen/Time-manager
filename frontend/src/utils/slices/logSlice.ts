import { createSlice } from "@reduxjs/toolkit";
import moment, { Moment } from "moment";

interface LogState {
  initialLogin: boolean;
  lastLoginDate: string | null;
  lastLoginTime: Moment | null;
  logData: [] | any;
  totalInTime: number;
}

const initialState: LogState = {
  initialLogin: false,
  lastLoginDate: null,
  lastLoginTime: null,
  logData: [],
  totalInTime: 0,
};

const logSlice = createSlice({
  name: "initialLogIn",
  initialState,
  reducers: {
    setInitialLogin: (state, action) => {
      if (!state.lastLoginDate) {
        state.initialLogin = true;
        state.lastLoginDate = action.payload;
      } else if (
        !moment(state.lastLoginDate).isSame(moment(action.payload), "day")
      ) {
        state.initialLogin = true;
      }
    },
    resetInitialLogin: (state) => {
      state.initialLogin = false;
    },
    setLastLoginTime: (state) => {
      state.lastLoginTime = moment();
    },
    pushLogInTime: (state, action) => {
      state.logData.push({ In: action.payload.format("LTS").toString() });
    },
    pushLogOutTime: (state, action) => {
      state.logData[state.logData.length - 1].Out = action.payload
        .format("LTS")
        .toString();
      const inTime = moment(
        state.logData[state.logData.length - 1].In,
        "hh:mm:ss A"
      );
      const outTime = moment(action.payload);
      const hourDifference = outTime.diff(inTime, "hours");
      const minuteDifference = outTime.diff(inTime, "minutes") % 60;
      const secondDifference = outTime.diff(inTime, "seconds") % 60;
      state.logData[
        state.logData.length - 1
      ].InTime = `${hourDifference}:${minuteDifference}:${secondDifference}`;
    },
    resetLogData: (state) => {
      state.logData = [];
    },
  },
});

export const {
  setInitialLogin,
  resetInitialLogin,
  pushLogInTime,
  pushLogOutTime,
  resetLogData,
} = logSlice.actions;
export default logSlice.reducer;
