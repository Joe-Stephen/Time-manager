//selectors
const currentTime = $(".current-time");
const punchInButton = $(".punch-in");
const punchOutButton = $(".punch-out");
const logsList = $(".logs-list");
const checkInTime = $(".check-in-time");
const totalFreetime = $(".total-freetime");
const compensatoryTime = $(".total-compensatory-time");
const estimatedCheckoutTime = $(".estimated-check-out-time");
const logsTable = $(".logs-table");
const totalLoggedInTime = $(".total-loggedIn-time");
let freetimeBalance = 3600000;
let adjustedFreetime;

//variable declarations for common use
let toCompensate = null;
let workedTime = 0;

//array for storing log timings(for calculations and listing)
const checkInLogs = [];
const checkOutLogs = [];

//variable for storing the current state(in/out)
let state = "";

//setting options for formatting time
const options = { timeStyle: "medium", hour12: true };

//finding current time
let timeNow = new Date().toLocaleString("en-US", options);

const calculateFreeTime = () => {
  // Parse the current time as a Date object
  const now = new Date();

  // Extract the year, month, and date from the current time
  const year = now.getFullYear();
  const month = now.getMonth();
  const date = now.getDate();

  // Create a Date object for 6:00 PM on the same day
  const endOfWorkDay = new Date(year, month, date, 18, 0, 0);

  // Calculate the difference in milliseconds
  let difference = endOfWorkDay - now;

  if (difference > 28800000) {
    difference = difference - 28800000;
  } else if (difference < 28800000) {
    toCompensate = 28800000 - difference;
    difference = toCompensate;
  } else {
    difference = 0;
  }

  // Convert the difference to hours and minutes
  const hours = Math.floor(difference / (1000 * 60 * 60));
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  if (toCompensate) {
    compensatoryTime.html(
      `Total compensatory time : ${hours} hours and ${minutes} minutes`
    );
  } else {
    totalFreetime.html(
      `Total freetime : ${hours} hours and ${minutes} minutes`
    );
  }
  estimatedCheckoutTime.html(
    `Estimated check out : ${6 + hours}:${0 + minutes} PM`
  );
};

//milliseconds to time format converter
function formatMilliseconds(ms) {
  let date = new Date(ms);
  let hours = String(date.getUTCHours()).padStart(2, "0");
  let minutes = String(date.getUTCMinutes()).padStart(2, "0");
  let seconds = String(date.getUTCSeconds()).padStart(2, "0");

  return `${hours}:${minutes}:${seconds}`;
}

//freetime adjuster
function adjustFreetime(ms) {
  let date = new Date(ms);
  let hours = String(date.getUTCHours()).padStart(2, "0");
  let minutes = String(date.getUTCMinutes()).padStart(2, "0");
  let seconds = String(date.getUTCSeconds()).padStart(2, "0");

  return `${minutes} minutes and ${seconds} seconds`;
}

//worktime adjuster
function adjustWorktime(ms) {
  let date = new Date(ms);
  let hours = String(date.getUTCHours()).padStart(2, "0");
  let minutes = String(date.getUTCMinutes()).padStart(2, "0");
  let seconds = String(date.getUTCSeconds()).padStart(2, "0");

  return `${hours} hours, ${minutes} minutes and ${seconds} seconds`;
}

//function for handling punch-in
const punchInAlert = () => {
  if (state === "" || state === "out") {
    timeNow = new Date();
    if (state === "") {
      checkInTime.html(
        `Check In : ${timeNow.toLocaleString("en-US", options)}`
      );
      totalFreetime.html(`Free time left : ${60} minutes and ${0} seconds`);
      calculateFreeTime();
    }
    state = "in";
    checkInLogs.push(timeNow);
    logsTable.append(
      `<tr>
      <td>${checkInLogs[checkInLogs.length - 1].toLocaleString(
        "en-US",
        options
      )}</td>
      <td>-</td>
      <td>-</td>
      </tr>`
    );
    const outTime = Math.abs(
      checkOutLogs[checkOutLogs.length - 1] -
        checkInLogs[checkInLogs.length - 1]
    );
    if (outTime > 0) {
      const outTimeConverted = formatMilliseconds(outTime);
      freetimeBalance -= outTime;
      if (freetimeBalance >= 0) {
        adjustedFreetime = adjustFreetime(freetimeBalance);
      } else {
        adjustedFreetime = "0 minutes and 0 seconds";
      }
      totalFreetime.html(`Free time left : ${adjustedFreetime}`);
    }
  } else {
    alert("You are already in");
  }
};

// funciton for handling punch-out
const punchOutAlert = () => {
  if (state === "in") {
    timeNow = new Date();
    state = "out";
    checkOutLogs.push(timeNow);
    const inTime = Math.abs(
      checkOutLogs[checkOutLogs.length - 1] -
        checkInLogs[checkInLogs.length - 1]
    );
    workedTime += inTime;
    const inTimeConverted = formatMilliseconds(inTime);
    $(".logs-table tr:last").replaceWith(`<tr>
      <td>${checkInLogs[checkInLogs.length - 1].toLocaleString(
        "en-US",
        options
      )}</td>
      <td>${checkOutLogs[checkOutLogs.length - 1].toLocaleString(
        "en-US",
        options
      )}</td>
      <td>${inTimeConverted}</td>
      </tr>`);
    totalLoggedInTime.html(
      `Total logged-in time : ${adjustWorktime(workedTime)}`
    );
  } else {
    alert("You are already out");
  }
};

//adding event listeners
punchInButton.on("click", punchInAlert);
punchOutButton.on("click", punchOutAlert);

//funciton to update time in realtime
function refreshTime() {
  const dateString = new Date().toLocaleString("en-US", options);
  const formattedString = dateString.replace(", ", " - ");
  currentTime.html(`Current time : ${formattedString} `);
}
//calling refreshTime function periodically
setInterval(refreshTime, 1000);
