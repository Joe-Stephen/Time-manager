import moment from "moment";

export const calculateEstimatedLogOutTime = (logInTime: any) => {
  const estimatedLogoutTime = moment(logInTime).add(8, "hours");
  return estimatedLogoutTime;
};

export const inTimeCalculator = (logInTime: any) => {
  const estimatedLogoutTime = moment(logInTime).add(8, "hours");
  return estimatedLogoutTime;
};