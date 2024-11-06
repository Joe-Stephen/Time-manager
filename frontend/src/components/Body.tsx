import React from "react";

const Body = () => {
  return (
    <>
      <div className="type-container bg-emerald-600">
        <h1 className="">Punching</h1>
        <button className="text-md p-2 m-4 bg-yellow-500 rounded-lg hover:bg-red-600">
          Punch In
        </button>
        <button className="text-md p-2 m-4 bg-yellow-500 rounded-lg hover:bg-red-600">
          Punch Out
        </button>
      </div>
    </>
  );
};

export default Body;
