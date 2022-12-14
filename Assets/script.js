// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  // initial variables and checking if there is any local storage, if not creating a new object
  var timeBox = document.querySelectorAll('.description');
  var dailyTasks = JSON.parse(localStorage.getItem("dailyTasks"));
  if (dailyTasks == null) {
    dailyTasks = {};
  };
  loadLocalStorage();

// load the local storage into the new session
  function loadLocalStorage() {
    for (const el in dailyTasks) {
      timeBox[el].value = dailyTasks[el];
    }
  };

// event listener for the save button and saving the user input to local storage
  $(".saveBtn").click(function(e) {
    var boxIndex = $(this).parent().data('index');
    var text = timeBox[boxIndex].value;
    dailyTasks[boxIndex] = text;
    var dailyTasksString = JSON.stringify(dailyTasks);
    localStorage.setItem("dailyTasks", dailyTasksString);
  });

  // event listener for the clearTasks button, and clearing the localStorage and reloading the page
  $(".clearTasks").click(function(e) {
    localStorage.clear();
    location.reload();
  });

  // Add code to apply the past, present, or future class to each time-block
  var timeBlock = document.querySelectorAll('.time-block');
  for (var i = 0; i < timeBlock.length; i++) {
    var currentHour = dayjs().format('H');
    var selectedElement = timeBlock[i].dataset["time"];
    if(currentHour > selectedElement) {
      timeBlock[i].classList.add('past');
    } else if(currentHour == selectedElement) {
      timeBlock[i].classList.add('present');   
    } else if(currentHour < selectedElement) {
      timeBlock[i].classList.add('future');
    }
  };

  // Add code to display the current date in the header of the page.
  var currentDate = dayjs().format('dddd, MMMM DD');
  var suffix = getSuffix(); 
  function getSuffix() {
    switch(dayjs().format('DD') % 10) {
    case 1:
      return 'st';
    case 2:
      return 'nd';
    case 3:
      return 'rd';
    default:
      return 'th';
    }
  };
  $('#currentDay').text(`${currentDate}${suffix}`);
});
