import React from "react";
import Clock from "react-live-clock";

const Head = () => {
  return (
    <>
      <div className="type-container bg-red-400 rounded-md flex justify-center">
        <Clock
          format={"h:mm:ssa"}
          style={{ fontSize: "1.5em" }}
          ticking={true}
        />
      </div>
    </>
  );
};

export default Head;
