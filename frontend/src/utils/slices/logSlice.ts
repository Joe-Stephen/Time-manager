import { createSlice } from "@reduxjs/toolkit";
import moment, { Moment } from "moment";

interface LogState {
  initialLogin: boolean;
  estimatedLogoutTime: Moment | null;
  lastLoginDate: string | null;
  lastLoginTime: Moment | null;
  logData: [] | any;
  totalInTime: number;
  totalOutTime: number;
  // toCompensate: number;
}

const initialState: LogState = {
  initialLogin: false,
  estimatedLogoutTime: null,
  lastLoginDate: null,
  lastLoginTime: null,
  logData: [],
  totalInTime: 0,
  totalOutTime: 0,
  // toCompensate: 0,
};

const logSlice = createSlice({
  name: "initialLogIn",
  initialState,
  reducers: {
    setInitialLogin: (state, action) => {
      if (!state.lastLoginDate) {
        state.initialLogin = true;
        state.lastLoginDate = action.payload;
        state.estimatedLogoutTime = moment(action.payload).add(8, "hour");
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
      if (state.logData.length >= 2) {
        const outTime = moment(
          state.logData[state.logData.length - 2].Out,
          "hh:mm:ss A"
        );
        const inTime = moment(action.payload);
        const hourDifference = outTime.diff(inTime, "hours");
        const minuteDifference = outTime.diff(inTime, "minutes") % 60;
        const secondDifference = outTime.diff(inTime, "seconds") % 60;
        //adding to total out-time
        const totalSecondsDifference = inTime.diff(outTime, "seconds");
        state.totalOutTime += totalSecondsDifference;
      }
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
      //adding to total in-time
      const totalSecondsDifference = outTime.diff(inTime, "seconds");
      state.totalInTime += totalSecondsDifference;
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
