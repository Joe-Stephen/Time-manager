//selectors
const currentTime = $(".current-time");
const punchInButton = $(".punch-in");
const punchOutButton = $(".punch-out");

//variable for storing the current state(in/out)
let state = "";

//setting options for formatting time
const options = { timeStyle: "short", hour12: true };

//finding current time
let timeNow = new Date().toLocaleString("en-US", options);

//function for handling punch-in
const punchInAlert = () => {
  if (state === "" || state === "out") {
    timeNow = new Date();
    console.log("in :", timeNow);
    state = "in";
  } else {
    alert("You are already in");
  }
};

// funciton for handling punch-out
const punchOutAlert = () => {
  if (state === "in") {
    timeNow = new Date();
    console.log("out :", timeNow);
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
