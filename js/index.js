// todays information
let today = moment();
let table = $(".container");
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
    // if timeblock in this hour, add class "present"
    if (i.isSame(today.startOf("hour"))) {
      textArea.addClass("present");
    } else if (i.isAfter(today.startOf("hour"))) { // if timeblock is after, apply class "after"
      textArea.addClass("future");
    } else {
      textArea.addClass("past"); // else aplly class "past"
    }
    // create save icon to go into button
    let icon = $("<i>").addClass("fa").addClass("fa-save");
    // create batton and append icon inside
    let saveBttn = $("<button>").addClass("saveBtn").append(icon).css("padding", "20px");
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
  console.log();
  let entry = {
    time: $(this).parent().children(".hour").text(),
    text: $(this).parent().children(".textarea").val(),
  };

  console.log(entry);

  localStorage.setItem("entry", entry);

  let savedEntry = localStorage.getItem("entry");
  $(".hour").val(entry.time);
  $(".textarea").val(entry.text);
 }

$(".container").on("click", ".saveBtn", saveMemo);

timeOfTheDay();
