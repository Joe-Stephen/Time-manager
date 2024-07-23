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
let freetimeBalance = 3600000;

//variable declarations for common use
let toCompensate = null;

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
  console.log("diff :", difference);

  if (difference > 28800000) {
    difference = difference - 28800000;
  } else if (difference < 28800000) {
    toCompensate = 28800000 - difference;
    difference = toCompensate;
    console.log("less :", difference);
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

//freetime adjusting function
function adjustFreetime(ms) {
  let date = new Date(ms);
  let hours = String(date.getUTCHours()).padStart(2, "0");
  let minutes = String(date.getUTCMinutes()).padStart(2, "0");
  let seconds = String(date.getUTCSeconds()).padStart(2, "0");

  return `${minutes} minutes and ${seconds} seconds`;
}

//function for handling punch-in
const punchInAlert = () => {
  if (state === "" || state === "out") {
    timeNow = new Date();
    if (state === "") {
      console.log("check in : ", timeNow);
      checkInTime.html(
        `Check In : ${timeNow.toLocaleString("en-US", options)}`
      );
      // totalFreetime.html(`Freetime : ${60} minutes and ${0} seconds left`);
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
    console.log("out time :", outTime);
    console.log("freetime balance :", freetimeBalance);
    const outTimeConverted = formatMilliseconds(outTime);
    freetimeBalance = freetimeBalance - outTime;
    console.log("adjusted freetime balance :", freetimeBalance);

    // const adjustedFreetime = adjustFreetime(freetimeBalance);
    // console.log("adjusted freetime :", adjustedFreetime);
    // totalFreetime.html(`Free time left : ${adjustedFreetime}`);
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
    // logsTable.append(
    //   `<tr>
    //   <td>-</td>
    //   <td>${checkOutLogs.pop().toLocaleString("en-US", options)}</td>
    //   <td>-</td>
    //   </tr>`
    // );
    console.log("logs :", checkInLogs);
    const inTime = Math.abs(
      checkOutLogs[checkOutLogs.length - 1] -
        checkInLogs[checkInLogs.length - 1]
    );
    console.log("in time :", inTime);
    const inTimeConverted = formatMilliseconds(inTime);
    console.log("in time converted :", inTimeConverted);
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
