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
  estimatedLogoutTime: localStorage.getItem("estimatedLogoutTime")
    ? moment(localStorage.getItem("estimatedLogoutTime"))
    : null,
  lastLoginDate: localStorage.getItem("lastLoginDate") || null,
  lastLoginTime: null,
  logData: localStorage.getItem("logData")
    ? JSON.parse(localStorage.getItem("logData") ?? "[]")
    : [],
  totalInTime: localStorage.getItem("totalInTime")
    ? parseInt(localStorage.getItem("totalInTime") ?? "0", 10)
    : 0,
  totalOutTime: localStorage.getItem("totalOutTime")
    ? parseInt(localStorage.getItem("totalOutTime") ?? "0", 10)
    : 0,
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
        // Save to localStorage
        if (state.lastLoginDate) {
          localStorage.setItem("lastLoginDate", state.lastLoginDate);
        }
        localStorage.setItem(
          "estimatedLogoutTime",
          state.estimatedLogoutTime.toISOString()
        );
      } else if (
        !moment(state.lastLoginDate).isSame(moment(action.payload), "day")
      ) {
        state.initialLogin = true;
      }
    },
    pushLogInTime: (state, action) => {
      state.logData.push({ In: action.payload.format("LTS").toString() });
      if (state.logData.length >= 2) {
        const outTime = moment(
          state.logData[state.logData.length - 2].Out,
          "hh:mm:ss A"
        );
        const inTime = moment(action.payload);
        //adding to total out-time
        const totalSecondsDifference = inTime.diff(outTime, "seconds");
        state.totalOutTime += totalSecondsDifference;
      }
      // Save logData to localStorage
      localStorage.setItem("logData", JSON.stringify(state.logData));
      localStorage.setItem("totalOutTime", state.totalOutTime.toString());
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
      // Adding to total in-time
      const totalSecondsDifference = outTime.diff(inTime, "seconds");
      state.totalInTime += totalSecondsDifference;
      // Save to localStorage
      localStorage.setItem("logData", JSON.stringify(state.logData));
      localStorage.setItem("totalInTime", state.totalInTime.toString());
    },
    resetLogData: (state) => {
      state.logData = [];
      state.initialLogin = false;
      state.totalInTime = 0;
      state.totalOutTime = 0;
      localStorage.removeItem("logData");
    },
  },
});

export const {
  setInitialLogin,
  // resetInitialLogin,
  pushLogInTime,
  pushLogOutTime,
  resetLogData,
} = logSlice.actions;
export default logSlice.reducer;
