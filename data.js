/* exported data */

var data = {
  nextEntryId: 1,
  editing: null,
  entries: {
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: [],
    saturday: [],
    sunday: []
  }
};

window.addEventListener('beforeunload', handleUnload);
window.addEventListener('DOMContentLoaded', handleContentLoad);

function handleUnload(event) {
  var dataJSON = JSON.stringify(data);
  localStorage.setItem('data-entry', dataJSON);
}

function handleContentLoad(event) {
  data = JSON.parse(localStorage.getItem('data-entry'));
}
