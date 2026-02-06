import React from "react";
import Clock from "react-live-clock";

const Head = () => {
  return (
    <div className="w-full flex justify-between items-center bg-slate-900/50 backdrop-blur-md border-b border-slate-700/50 px-6 py-4 sticky top-0 z-50">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-gradient-to-tr from-emerald-500 to-cyan-500 rounded-lg flex items-center justify-center shadow-lg shadow-emerald-500/20">
          <span className="text-white font-bold text-lg">T</span>
        </div>
        <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
          Time Manager
        </h1>
      </div>

      <div className="flex items-center gap-4 bg-slate-800/50 px-4 py-2 rounded-full border border-slate-700/50">
        <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]"></span>
        <Clock
          format={"h:mm:ss A"}
          style={{
            fontSize: "1.1rem",
            fontFamily: "monospace",
            fontWeight: 600,
            color: "#e2e8f0",
          }}
          ticking={true}
        />
      </div>
    </div>
  );
};

export default Head;
