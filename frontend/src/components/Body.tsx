import React from "react";
import moment from "moment";
import MaterialTable from "../utils/Table";
import { calculateEstimatedLogOutTime } from "../utils/helpers";
import { useDispatch, useSelector } from "react-redux";
import {
  pushLogInTime,
  pushLogOutTime,
  resetLogData,
  setInitialLogin,
} from "../utils/slices/logSlice";
import { toggleLoggedInStatus } from "../utils/slices/appSlice";

const Body = () => {
  //mock data
  const data = [
    { In: "10:00 AM", Out: "10:30 AM", "In-Time": "00:30" },
    { In: "11:00 AM", Out: "11:30 AM", "In-Time": "00:30" },
    { In: "01:00 PM", Out: "01:30 PM", "In-Time": "00:30" },
  ];

  const dispatch = useDispatch();
  const lastLoginDate = useSelector((store: any) => store.log.lastLoginDate);
  const initialLogin = useSelector((store: any) => store.log.initialLogin);
  const isLoggedIn = useSelector((store: any) => store.app.isLoggedIn);
  const logData = useSelector((store: any) => store.log.logData);
  const totalInTime = useSelector((store: any) => store.log.totalInTime);
  const totalOutTime = useSelector((store: any) => store.log.totalOutTime);
  const estimatedLogOutTime = useSelector(
    (store: any) => store.log.estimatedLogoutTime
  );

  //function to handle the log in
  const logInHandler = () => {
    if (isLoggedIn) {
      alert("You are already logged in.");
    } else {
      if (lastLoginDate && !moment().isSame(moment(lastLoginDate), "day")) {
        dispatch(resetLogData());
        dispatch(setInitialLogin(moment()));
      } else if (!lastLoginDate) {
        dispatch(setInitialLogin(moment()));
      }
      dispatch(pushLogInTime(moment()));
      dispatch(toggleLoggedInStatus());
      if (totalOutTime > 3600) {
      }
    }
  };

  //function to handle the log out
  const logOutHandler = () => {
    if (!isLoggedIn) {
      alert("You are already logged out.");
    } else {
      dispatch(pushLogOutTime(moment()));
      dispatch(toggleLoggedInStatus());
    }
  };
  return (
    <>
      <div className="type-container bg-emerald-600 p-2 rounded-md flex justify-center">
        <h1 className="">Punching</h1>
      </div>
      <div className="p-2 m-2 bg-gray-400 rounded-md flex justify-center">
        <button
          onClick={() => logInHandler()}
          className="text-md p-2 m-2 bg-yellow-500 rounded-lg hover:bg-red-600"
        >
          Log In
        </button>
        <button
          onClick={() => logOutHandler()}
          className="text-md p-2 m-2 bg-yellow-500 rounded-lg hover:bg-red-600"
        >
          Log Out
        </button>
      </div>
      <div className="p-2 m-2 bg-gray-400 rounded-md flex flex-col justify-center">
        <h1 className="underline underline-offset-4">Timings</h1>
        <h2>
          Log in time :{" "}
          {lastLoginDate
            ? moment(lastLoginDate).format("LTS").toString()
            : "Please log in"}{" "}
        </h2>
        <h2>
          Estimated log out time:{" "}
          {estimatedLogOutTime
            ? totalOutTime > 3600
              ? moment(estimatedLogOutTime)
                  .add(totalOutTime - 3600, "seconds")
                  .format("LTS")
              : moment(estimatedLogOutTime).format("LTS")
            : "Please log in"}
        </h2>
        <h2>
          Total in-time :{" "}
          {totalInTime
            ? moment.utc(totalInTime * 1000).format("HH:mm:ss")
            : "00:00:00"}{" "}
        </h2>
        <h2>
          Total out-time :{" "}
          {totalOutTime
            ? moment.utc(totalOutTime * 1000).format("HH:mm:ss")
            : "00:00:00"}{" "}
        </h2>
      </div>
      <div className="p-2 m-2 bg-gray-400 rounded-md flex flex-col justify-center">
        <h1 className="underline underline-offset-4">Logs</h1>
        <MaterialTable data={logData} />
      </div>
    </>
  );
};

export default Body;
