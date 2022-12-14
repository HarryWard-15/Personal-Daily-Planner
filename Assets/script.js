// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  var timeBox = document.querySelectorAll('.description');
  var dailyTasks = JSON.parse(localStorage.getItem("dailyTasks"));
  if (dailyTasks == null) {
    dailyTasks = {};
  };
  loadLocalStorage();


  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?

  function loadLocalStorage() {
    for (const el in dailyTasks) {
      timeBox[el].value = dailyTasks[el];
    }
  };

  $(".saveBtn").click(function(e) {
    var boxIndex = $(this).parent().data('index');
    var text = timeBox[boxIndex].value;
    dailyTasks[boxIndex] = text;
    var dailyTasksString = JSON.stringify(dailyTasks);
    localStorage.setItem("dailyTasks", dailyTasksString);
    console.log(dailyTasksString);
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

  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?


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
