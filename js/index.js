// todays information
let today = moment();
let table = $(".container");
// Access local storage
let savedEntries = localStorage.getItem("entry");
if (savedEntries == undefined) {
  savedEntries = {};
} else {
  savedEntries = JSON.parse(savedEntries);
}
console.log(savedEntries);
// display
$("#currentDay").text(today.format("dddd, MMMM, Do"));

// start of the working day
let start = moment("9:00", "HH:mm");
// end of the working day
let end = moment("24:00", "HH:mm");
// table for every hour in working day
function timeOfTheDay() {
  for (let i = start; i.diff(end); i.add(1, "h")) {
    // creating textarea with class textarea
    // added 'flex-grow' attribute for it to take more spase
    let textArea = $("<textarea>").addClass("textarea").css("flex-grow", "1");
    // Check if there are entrys in local storage
    let match = savedEntries[i.format("HH:mm")];
    console.log(match);
    if (match !== undefined) {
      textArea.text(match);
    }
    if (i.isSame(today.startOf("hour"))) {
      // if timeblock in this hour, add class "present"
      textArea.addClass("present");
    } else if (i.isAfter(today.startOf("hour"))) {
      // if timeblock is after, apply class "after"
      textArea.addClass("future");
    } else {
      textArea.addClass("past"); // else aplly class "past"
    }
    // create save icon to go into button
    let icon = $("<i>").addClass("fa").addClass("fa-save");
    // create batton and append icon inside
    let saveBttn = $("<button>")
      .addClass("saveBtn")
      .append(icon)
      .css("padding", "20px");
    // Create Timeslot with class "timeblock"
    let newTimeSlot = $("<div>").addClass("time-block").addClass("row");
    // create container for hours
    let hour = $("<span>").addClass("hour").text(i.format("HH:mm"));
    // append all the elements tougether
    newTimeSlot.append(hour).append(textArea).append(saveBttn);
    // add Timeslot to table
    table.append(newTimeSlot);
  }
}


function saveMemo(event) {
  event.preventDefault();
  let time = $(this).parent().children(".hour").text();
  let text = $(this).parent().children(".textarea").val();
  savedEntries[time] = text;
  // save to local storage
  localStorage.setItem("entry", JSON.stringify(savedEntries));
  let saveMsg = $("<p>").text("Appointment added to local storage").css("text-align", "center");
  $(".save").append(saveMsg);
}

$(".container").on("click", ".saveBtn", saveMemo);

timeOfTheDay();
