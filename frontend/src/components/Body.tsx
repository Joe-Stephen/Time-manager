import React from "react";
import MaterialTable from "../utils/Table";

const Body = () => {
  const data = [
    { In: "10:00 AM", Out: "10:30 AM", "In-Time": "00:30" },
    { In: "11:00 AM", Out: "11:30 AM", "In-Time": "00:30" },
    { In: "01:00 PM", Out: "01:30 PM", "In-Time": "00:30" },
  ];
  return (
    <>
      <div className="type-container bg-emerald-600 p-2">
        <h1 className="">Punching</h1>
      </div>
      <div className="h-20 w-60 p-2 m-2 bg-gray-400 rounded-md flex justify-center">
        <button className="text-md p-2 m-2 bg-yellow-500 rounded-lg hover:bg-red-600">
          Log In
        </button>
        <button className="text-md p-2 m-2 bg-yellow-500 rounded-lg hover:bg-red-600">
          Log Out
        </button>
      </div>
      <div className="h-20 w-60 p-2 m-2 bg-gray-400 rounded-md flex flex-col justify-center">
        <h1 className="underline underline-offset-4">Timings</h1>
        <h2>Logged in:</h2>
        <h2>Logged out:</h2>
      </div>
      <div className="h-20 w-60 p-2 m-2 bg-gray-400 rounded-md flex flex-col justify-center">
        <h1 className="underline underline-offset-4">Logs</h1>
      </div>
      <MaterialTable data={data} />
    </>
  );
};

export default Body;
