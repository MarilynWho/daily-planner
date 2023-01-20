// todays information
let today = moment();
let table = $(".container");
// display
$("#currentDay").text(today.format("dddd, MMMM, Do"));

// start of the working day
let start = moment("18:00", "HH:mm");
// end of the working day
let end = moment("24:00", "HH:mm");
// table for every hour in working day
function timeOfTheDay() {
  for (let i = start; i.diff(end); i.add(1, "h")) {
    console.log(i.diff(end));
    let textArea = $("<textarea>").addClass("textarea").css("flex-grow", "1"); // addClass("description")
    if (i.isSame(today.startOf("hour"))) {
      textArea.addClass("present");
    } else if (i.isAfter(today.startOf("hour"))) {
      textArea.addClass("future");
    } else {
      textArea.addClass("past");
    }
    let icon = $("<i>").addClass("fa").addClass("fa-save");
    let saveBttn = $("<button>").addClass("saveBtn").append(icon).css("padding", "20px");
    let newTimeSlot = $("<div>").addClass("time-block").addClass("row");
    let hour = $("<span>").addClass("hour").text(i.format("HH:mm"));
    newTimeSlot.append(hour).append(textArea).append(saveBttn);
    table.append(newTimeSlot);
  }
}

timeOfTheDay();
