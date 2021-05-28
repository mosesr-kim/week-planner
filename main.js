/* global data */
/* exported data */

var $addEntryButton = document.querySelector('.add-entry-button');
var $addEntryForm = document.querySelector('.add-entry-form');
var $modalItems = document.querySelectorAll('.modal');

$addEntryButton.addEventListener('click', clickAddEntry);
$addEntryForm.addEventListener('submit', addNewEntry);

function clickAddEntry(event) {
  for (var i = 0; i < $modalItems.length; i++) {
    $modalItems[i].classList.toggle('hidden');
  }
}

function addNewEntry(event) {
  event.preventDefault();
  clickAddEntry();
  var newEntry = {
    day: $addEntryForm.elements.dayOfWeek.value,
    time: $addEntryForm.elements.timeOfDay.value,
    description: $addEntryForm.elements.description.value,
    entryID: data.nextEntryId
  };
  data.nextEntryId++;
  data.entries[newEntry.day].push(newEntry);
}
