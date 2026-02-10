import React from "react";
import moment from "moment";
import MaterialTable from "../utils/Table";
import { useDispatch, useSelector } from "react-redux";
import {
  pushLogInTime,
  pushLogOutTime,
  resetLogData,
  setInitialLogin,
} from "../utils/slices/logSlice";
import { toggleLoggedInStatus } from "../utils/slices/appSlice";
import { motion } from "framer-motion";
import {
  FaPlay,
  FaStop,
  FaClock,
  FaHistory,
  FaSignOutAlt,
} from "react-icons/fa";

// Stats Card Component
const StatCard = ({ title, value, icon, color }: any) => (
  <motion.div
    whileHover={{ y: -5 }}
    className="bg-slate-800/50 p-4 rounded-xl border border-slate-700 backdrop-blur-sm"
  >
    <div className={`text-${color}-400 text-xl mb-2`}>{icon}</div>
    <h3 className="text-slate-400 text-xs font-medium uppercase tracking-wider">
      {title}
    </h3>
    <p className="text-2xl font-bold text-white mt-1 font-sans">{value}</p>
  </motion.div>
);

const Body = () => {
  //mock data
  const dispatch = useDispatch();
  const lastLoginDate = useSelector((store: any) => store.log.lastLoginDate);
  const isLoggedIn = useSelector((store: any) => store.app.isLoggedIn);
  const logData = useSelector((store: any) => store.log.logData);
  const totalInTime = useSelector((store: any) => store.log.totalInTime);
  const totalOutTime = useSelector((store: any) => store.log.totalOutTime);
  const estimatedLogOutTime = useSelector(
    (store: any) => store.log.estimatedLogoutTime,
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

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="space-y-8 w-full"
    >
      {/* Action Buttons */}
      <motion.div variants={itemVariants} className="flex justify-center gap-6">
        <button
          onClick={logInHandler}
          className="btn-primary flex items-center gap-2 group"
        >
          <FaPlay className="text-xs group-hover:scale-110 transition-transform" />
          <span>Punch In</span>
        </button>
        <button
          onClick={logOutHandler}
          className="btn-secondary flex items-center gap-2 group hover:bg-red-500/20 hover:text-red-400 hover:border-red-500/50"
        >
          <FaStop className="text-xs group-hover:scale-110 transition-transform" />
          <span>Punch Out</span>
        </button>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        <StatCard
          title="Last Login"
          value={lastLoginDate ? moment(lastLoginDate).format("LT") : "--:--"}
          icon={<FaClock />}
          color="emerald"
        />
        <StatCard
          title="Est. Logout"
          value={
            estimatedLogOutTime
              ? totalOutTime > 3600
                ? moment(estimatedLogOutTime)
                    .add(totalOutTime - 3600, "seconds")
                    .format("LT")
                : moment(estimatedLogOutTime).format("LT")
              : "--:--"
          }
          icon={<FaSignOutAlt />}
          color="violet"
        />
        <StatCard
          title="Total Worked"
          value={
            totalInTime
              ? moment.utc(totalInTime * 1000).format("HH:mm:ss")
              : "00:00:00"
          }
          icon={<FaHistory />}
          color="blue"
        />
        <StatCard
          title="Break Time"
          value={
            totalOutTime
              ? moment.utc(totalOutTime * 1000).format("HH:mm:ss")
              : "00:00:00"
          }
          icon={<FaStop />}
          color="amber"
        />
      </motion.div>

      {/* Logs Section */}
      <motion.div
        variants={itemVariants}
        className="bg-slate-800/30 rounded-xl border border-slate-700/50 overflow-hidden"
      >
        <div className="p-4 border-b border-slate-700/50 bg-slate-800/50">
          <h2 className="text-lg font-semibold text-slate-200 flex items-center gap-2">
            <FaHistory className="text-slate-400" />
            Recent Logs
          </h2>
        </div>
        <div className="p-4">
          <MaterialTable data={logData} />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Body;
