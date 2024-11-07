import moment from "moment";
const calculateEstimatedLogOutTime = (logInTime: any) => {
  const estimatedLogoutTime = moment(logInTime).add(8, "hours");
  return estimatedLogoutTime;
};

export default calculateEstimatedLogOutTime;
