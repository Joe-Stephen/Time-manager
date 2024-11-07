import React from "react";
import moment from "moment";
import MaterialTable from "../utils/Table";
import calculateEstimatedLogOutTime from "../utils/helpers";
import { useDispatch, useSelector } from "react-redux";
import { resetInitialLogin, setInitialLogin } from "../utils/slices/logSlice";

const Body = () => {
  //mock data
  const data = [
    { In: "10:00 AM", Out: "10:30 AM", "In-Time": "00:30" },
    { In: "11:00 AM", Out: "11:30 AM", "In-Time": "00:30" },
    { In: "01:00 PM", Out: "01:30 PM", "In-Time": "00:30" },
  ];
  const dispatch = useDispatch();
  const lastLoginDate = useSelector((store: any) => store.log.lastLoginDate);

  //function to handle the log in
  const logInHandler = () => {
    if (lastLoginDate && !moment().isSame(moment(lastLoginDate), "day")) {
      dispatch(resetInitialLogin());
    } else {
      dispatch(setInitialLogin({ lastLoginDate: moment() }));
    }
  };
  //function to handle the log out
  const logOutHandler = () => {};
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
        <button className="text-md p-2 m-2 bg-yellow-500 rounded-lg hover:bg-red-600">
          Log Out
        </button>
      </div>
      <div className="p-2 m-2 bg-gray-400 rounded-md flex flex-col justify-center">
        <h1 className="underline underline-offset-4">Timings</h1>
        <h2>Log in time:</h2>
        <h2>Estimated log out time:</h2>
        <h2>Total in-time:</h2>
        <h2>Log out time:</h2>
      </div>
      <div className="p-2 m-2 bg-gray-400 rounded-md flex flex-col justify-center">
        <h1 className="underline underline-offset-4">Logs</h1>
        <MaterialTable data={data} />
      </div>
    </>
  );
};

export default Body;
