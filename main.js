/* global data */
/* exported data */

var $addEntryButton = document.querySelector('.add-entry-button');
var $addEntryForm = document.querySelector('.add-entry-form');
var $modalItems = document.querySelectorAll('.modal');
var $timeItems = document.querySelectorAll('td:first-child');
var $descriptionItems = document.querySelectorAll('td:last-child');

$addEntryButton.addEventListener('click', clickAddEntry);
$addEntryForm.addEventListener('submit', addNewEntry);
document.addEventListener('click', clickDayOfWeek);

function clickAddEntry(event) {
  for (var i = 0; i < $modalItems.length; i++) {
    $modalItems[i].classList.toggle('hidden');
  }
}

function addNewEntry(event) {
  event.preventDefault();
  clickAddEntry();
  var newEntry = {
    time: $addEntryForm.elements.timeOfDay.value,
    description: $addEntryForm.elements.description.value,
    entryID: data.nextEntryId
  };
  data.nextEntryId++;
  data.entries[$addEntryForm.elements.dayOfWeek.value].push(newEntry);
  $addEntryForm.reset();
}

function sortDay(day) {
  return day.sort(function (x, y) {
    return parseInt(x.time) - parseInt(y.time);
  });
}

function editTableDOM(dayOfWeek) {
  for (var i = 0; i < 8; i++) {
    if (dayOfWeek[i]) {
      $timeItems[i].textContent = dayOfWeek[i].time;
      $descriptionItems[i].textContent = dayOfWeek[i].description;
    } else {
      $timeItems[i].textContent = ' ';
      $descriptionItems[i].textContent = ' ';
    }
  }
}

function clickDayOfWeek(event) {
  if (event.target.className !== 'dayOfWeekBtn') {
    return;
  }
  var sortedDay = sortDay(data.entries[event.target.getAttribute('data-view')]);
  editTableDOM(sortedDay);
}
