//selectors
const currentTime = $(".current-time");
const punchInButton = $(".punch-in");
const punchOutButton = $(".punch-out");
const logsList = $(".logs-list");
const checkInTime = $(".check-in-time");

//array for storing log timings(for calculations and listing)
const logs = [];

//variable for storing the current state(in/out)
let state = "";

//setting options for formatting time
const options = { timeStyle: "medium", hour12: true };

//finding current time
let timeNow = new Date().toLocaleString("en-US", options);

//function to calculate free time
const calculateFreeTime = () => {
  let splittedDate = timeNow.toString().split("");
  const test =
    splittedDate.slice(0, 16) + "18:00:00" + splittedDate.slice(24).join("");
  console.log("patched :", test);
  const difference = parseInt(Math.abs(timeNow - splittedDate));
  console.log("diff :", difference);
};

//milliseconds to time format converter
function formatMilliseconds(ms) {
  let date = new Date(ms);
  let hours = String(date.getUTCHours()).padStart(2, "0");
  let minutes = String(date.getUTCMinutes()).padStart(2, "0");
  let seconds = String(date.getUTCSeconds()).padStart(2, "0");

  return `${hours}:${minutes}:${seconds}`;
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
      calculateFreeTime();
    }
    state = "in";
    logs.push(timeNow);
    logsList.append(
      `<h5>In : ${timeNow.toLocaleString("en-US", options)}</h5>`
    );
  } else {
    alert("You are already in");
  }
};

// funciton for handling punch-out
const punchOutAlert = () => {
  if (state === "in") {
    timeNow = new Date();
    state = "out";
    logs.push(timeNow);
    logsList.append(
      `<h5>Out : ${timeNow.toLocaleString("en-US", options)}</h5>`
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
