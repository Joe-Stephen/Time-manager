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

//variable declarations for common use
let freetimeBalance = localStorage.getItem("freetimeBalance") || 5000;
let toCompensate = localStorage.getItem("toCompensate") || 0;
let workedTime = localStorage.getItem("workedTime") || 0;
let checkoutHour;
let checkoutMinute;

//array for storing log timings(for calculations and listing)
const checkInLogs = JSON.parse(localStorage.getItem("checkInLogs")) || [];
const checkOutLogs = JSON.parse(localStorage.getItem("checkOutLogs")) || [];

//variable for storing the current state(in/out)
let state = localStorage.getItem("state") || "";

//setting options for formatting time
const options = { timeStyle: "medium", hour12: true };

//finding current time
let timeNow = new Date().toLocaleString("en-US", options);

//compensatory time adjuster
function adjustCompensatoryTime(ms) {
  let date = new Date(ms);
  let hours = String(date.getUTCHours()).padStart(2, "0");
  let minutes = String(date.getUTCMinutes()).padStart(2, "0");
  let seconds = String(date.getUTCSeconds()).padStart(2, "0");
  checkoutHour = 6 + date.getUTCHours();
  checkoutMinute = 0 + date.getUTCMinutes();
  adjustCheckoutTime();
  compensatoryTime.html(
    `Total compensatory time : ${hours} hours, ${minutes} minutes and ${seconds} seconds`
  );
}

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
  checkoutHour = 6 + hours;
  checkoutMinute = 0 + minutes;
  if (toCompensate !== 0) {
    adjustCompensatoryTime(toCompensate);
  } else {
    totalFreetime.html(
      `Total freetime : ${hours} hours and ${minutes} minutes`
    );
  }
  adjustCheckoutTime();
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
function adjustFreetime(ms = 5000) {
  let date = new Date(ms);
  let hours = String(date.getUTCHours()).padStart(2, "0");
  let minutes = String(date.getUTCMinutes()).padStart(2, "0");
  let seconds = String(date.getUTCSeconds()).padStart(2, "0");
  totalFreetime.html(
    `Free time left : ${minutes} minutes and ${seconds} seconds`
  );

  return `${minutes} minutes and ${seconds} seconds`;
}

//checkout time adjuster
function adjustCheckoutTime() {
  estimatedCheckoutTime.html(
    `Estimated check out : ${
      checkoutHour < 10 ? "0" + checkoutHour : checkoutHour
    }:${checkoutMinute < 10 ? "0" + checkoutMinute : checkoutMinute} PM`
  );
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
      adjustFreetime(freetimeBalance);
      calculateFreeTime();
    }
    state = "in";
    checkInLogs.push(timeNow);
    localStorage.setItem("checkInLogs", JSON.stringify(checkInLogs));
    localStorage.setItem("state", state);
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
      localStorage.setItem("freetimeBalance", freetimeBalance);
      if (freetimeBalance >= 0) {
        adjustedFreetime = adjustFreetime(freetimeBalance);
      } else {
        adjustedFreetime = "0 minutes and 0 seconds";
        toCompensate += Math.abs(freetimeBalance);
        localStorage.setItem("toCompensate", toCompensate);
        adjustCompensatoryTime(toCompensate);
      }
      totalFreetime.html(`Free time left : ${adjustedFreetime}`);
    }
  } else {
    alert("You are already in");
  }
};

// function for handling punch-out
const punchOutAlert = () => {
  if (state === "in") {
    timeNow = new Date();
    state = "out";
    checkOutLogs.push(timeNow);
    localStorage.setItem("checkOutLogs", JSON.stringify(checkOutLogs));
    localStorage.setItem("state", state);
    const inTime = Math.abs(
      checkOutLogs[checkOutLogs.length - 1] -
        checkInLogs[checkInLogs.length - 1]
    );
    workedTime += inTime;
    localStorage.setItem("workedTime", workedTime);
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

//function to update time in realtime
function refreshTime() {
  const dateString = new Date().toLocaleString("en-US", options);
  const formattedString = dateString.replace(", ", " - ");
  currentTime.html(`Current time : ${formattedString} `);
}
//calling refreshTime function periodically
setInterval(refreshTime, 1000);

// Restore UI state on page load
if (state === "in") {
  checkInTime.html(
    `Check In : ${checkInLogs[checkInLogs.length - 1].toLocaleString(
      "en-US",
      options
    )}`
  );
  adjustFreetime(freetimeBalance);
  calculateFreeTime();
}

checkInLogs.forEach((checkInLog, index) => {
  logsTable.append(
    `<tr>
      <td>${new Date(checkInLog).toLocaleString("en-US", options)}</td>
      <td>${checkOutLogs[index] ? new Date(checkOutLogs[index]).toLocaleString("en-US", options) : "-"}</td>
      <td>${checkOutLogs[index] ? formatMilliseconds(checkOutLogs[index] - checkInLog) : "-"}</td>
    </tr>`
  );
});

totalLoggedInTime.html(
  `Total logged-in time : ${adjustWorktime(workedTime)}`
);

if (toCompensate > 0) {
  adjustCompensatoryTime(toCompensate);
}
