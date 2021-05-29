/* global data */
/* exported data */

var $addEntryButton = document.querySelector('.add-entry-button');
var $addEntryForm = document.querySelector('.add-entry-form');
var $modalItems = document.querySelectorAll('.modal');
var $dayHeader = document.querySelector('.day-header');
var $tableBody = document.querySelector('.table-body');
var $modalTitle = document.querySelector('.modal-title');

$addEntryButton.addEventListener('click', clickAddEntry);
$addEntryForm.addEventListener('submit', addNewEntry);
document.addEventListener('click', clickDayOfWeek);
$tableBody.addEventListener('click', clickTableButton);

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
    day: $addEntryForm.elements.dayOfWeek.value,
    entryID: data.nextEntryId
  };

  if (data.editing) {
    for (var day in data.entries) {
      for (var i = 0; i < data.entries[day].length; i++) {
        if (parseInt(data.editing.entryID) === data.entries[day][i].entryID) {
          data.entries[day][i].day = $addEntryForm.elements.dayOfWeek.value;
          data.entries[day][i].time = $addEntryForm.elements.timeOfDay.value;
          data.entries[day][i].description = $addEntryForm.elements.description.value;
        }
      }
    }
    data.editing = null;
  } else {
    data.nextEntryId++;
    data.entries[$addEntryForm.elements.dayOfWeek.value].push(newEntry);
  }

  $addEntryForm.reset();
  $modalTitle.textContent = 'Add Entry';
  generateTableDOM(sortDay(data.entries[newEntry.day]));

}

function sortDay(day) {
  return day.sort(function (x, y) {
    return parseInt(x.time) - parseInt(y.time);
  });
}

function generateRowDOM(entry) {
  /**
   * <tr>
      <td>
        <span>time</span>
      </td>
      <td>
        <span>description</span>
        <button class="edit-entry-button">Update</button>
      </td>
    </tr>
   */
  var $timeText = document.createElement('span');
  $timeText.textContent = entry.time;

  var $timeTD = document.createElement('td');
  $timeTD.appendChild($timeText);

  var $descriptionText = document.createElement('span');
  $descriptionText.textContent = entry.description;

  var $updateEntryButton = document.createElement('button');
  $updateEntryButton.textContent = 'Update';
  $updateEntryButton.className = 'edit-entry-button';

  var $buttonContainer = document.createElement('div');
  $buttonContainer.appendChild($updateEntryButton);

  var $descTD = document.createElement('td');
  $descTD.appendChild($descriptionText);
  $descTD.appendChild($buttonContainer);
  $descTD.className = 'justify-between align-center';

  var $tableRow = document.createElement('tr');
  $tableRow.appendChild($timeTD);
  $tableRow.appendChild($descTD);
  $tableRow.setAttribute('data-entry-id', entry.entryID);

  return $tableRow;
}

function generateEmptyRow() {
  var $timeText = document.createElement('span');
  $timeText.textContent = ' ';

  var $timeTD = document.createElement('td');
  $timeTD.appendChild($timeText);

  var $descriptionText = document.createElement('span');
  $descriptionText.textContent = ' ';

  var $descTD = document.createElement('td');
  $descTD.appendChild($descriptionText);

  var $tableRow = document.createElement('tr');
  $tableRow.appendChild($timeTD);
  $tableRow.appendChild($descTD);

  return $tableRow;
}

function clickDayOfWeek(event) {
  if (event.target.className !== 'dayOfWeekBtn') {
    return;
  }
  var sortedDay = sortDay(data.entries[event.target.getAttribute('data-view')]);
  generateTableDOM(sortedDay);
  $dayHeader.textContent = event.target.getAttribute('data-view')[0].toUpperCase() + event.target.getAttribute('data-view').slice(1);
}

function generateTableDOM(entryList) {
  destroyChildren($tableBody);
  for (var i = 0; i < 8; i++) {
    if (entryList[i]) $tableBody.appendChild(generateRowDOM(entryList[i]));
    else $tableBody.appendChild(generateEmptyRow());
  }
}

function destroyChildren(el) {
  while (el.firstChild) el.firstChild.remove();
}

function clickTableButton(event) {
  if (event.target.tagName !== 'BUTTON') {
    return;
  }
  if (event.target.className === 'edit-entry-button') {
    var entryID = event.target.closest('tr').getAttribute('data-entry-id');
    for (var day in data.entries) {
      for (var i = 0; i < data.entries[day].length; i++) {
        if (parseInt(entryID) === data.entries[day][i].entryID) {
          data.editing = data.entries[day][i];
          updateEntry(data.entries[day][i]);
        }
      }
    }
  }
}

function updateEntry(entry) {
  clickAddEntry();
  $modalTitle.textContent = 'Update Entry';
  $addEntryForm.elements.dayOfWeek.value = entry.day;
  $addEntryForm.elements.timeOfDay.value = entry.time;
  $addEntryForm.elements.description.value = entry.description;
}
