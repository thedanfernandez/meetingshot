var updateContext = "";

function loadMeetingAttendees(attendees) {
  //check if attendees is an array, if not, log error
  if (!Array.isArray(attendees)) {
    console.log("attendees parameter must be an array of attendees");
    return;
  }

  const meetingGrid = document.getElementById("meetingGrid");

  meetingGrid.innerHTML = "";

  for (let i = 0; i < attendees.length; i++) {
    let attendeeHtml = `<div class="cell">
            <img
              onclick="javascript:showModal(this.parentNode);"
              class="cell-image"
              src="${attendees[i].path}"
            />
          </div>`;
    meetingGrid.insertAdjacentHTML("beforeend", attendeeHtml);
  }

  //get child nodes here
  switch (attendees.length) {
    case 8:
      meetingGrid.childNodes[6].className = "cell8g-7";
      meetingGrid.childNodes[7].className = "cell8g-8";
      break;
    case 7:
      meetingGrid.childNodes[6].className = "cell7g-7";
      break;
    case 5:
      meetingGrid.childNodes[3].className = "cell5g-4";
      meetingGrid.childNodes[4].className = "cell5g-5";
      break;
    case 3:
      meetingGrid.childNodes[2].className = "cell3g-3";
      break;
    case 1:
      meetingGrid.childNodes[0].className = "cell1g-1";
      break;
    default:
      break;
  }
}

// Switch style based on # of attendees
function reStyleMeetingGrid() {
  console.log("Re-styling...")
  var meetingGrid = document.getElementById("meetingGrid");
  var childCount = meetingGrid.childElementCount;

  if (childCount >= 5 && childCount <= 9) {
    meetingGrid.className = "grid grid-border grid-3row-3col";
  } else if (childCount >= 3 && childCount <= 4) {
    meetingGrid.className = "grid grid-border grid-2row-2col";
  } else if (childCount >= 1 && childCount <= 2) {
    meetingGrid.className = "grid grid-border grid-1row-2col";
  }
}

// It's important to use this function to preserve the user's choices for previous
// images and selections. Otherwise the grid is re-created.
function setAttendeeConstraint(numberOfAttendees) {
  var meetingGrid = document.getElementById("meetingGrid");
  var childCount = meetingGrid.childElementCount;

  // We need to reduce child elements.
  if (childCount > numberOfAttendees) {
    var elementsToRemove = childCount - numberOfAttendees;

    for (iterator = 0; iterator < elementsToRemove; iterator++) {
      var elementToRemove = meetingGrid.childNodes[childCount - 1 - iterator];
      var videoContainer = elementToRemove.querySelector('.main-page-video-container');

      if (videoContainer) {
        console.log("Need to stop the camera.");
        stopCamera(videoContainer);
      }

      meetingGrid.removeChild(elementToRemove);
    }
  } else if (childCount < numberOfAttendees) { // We need to add meeting attendees.
    var elementsToAdd = numberOfAttendees - childCount;

    console.log("To add: " + elementsToAdd);

    for (iterator = 0; iterator < elementsToAdd; iterator++) {
      console.log("Adding attendee, iteration " + iterator)
      var randomAttendee = 0;
      var imagePath = '';

      do {
        randomAttendee = getRandomAttendeeId();
        imagePath = galleryAttendees[randomAttendee].path;
      } while (imageExistsInGrid(imagePath));

      let attendeeHtml = `<div class="cell">
                            <img
                              onclick="javascript:showModal(this.parentNode);"
                              class="cell-image"
                              src="${imagePath}"
                            />
                          </div>`;

      meetingGrid.insertAdjacentHTML("beforeend", attendeeHtml);
    }
  }

  reStyleMeetingGrid();
}

function getRandomAttendeeId() {
  var generatedNumber = Math.floor(Math.random() * Math.floor(galleryAttendees.length))
  return generatedNumber;
}

// Checks if an image already exists in the grid. This is important when we recreate the grid
// because ideally we don't want to duplicate an image in the attendee list.
function imageExistsInGrid(path) {
  var meetingGrid = document.getElementById("meetingGrid");

  for (i = 0; i < meetingGrid.childElementCount; i++) {
    var element = meetingGrid.childNodes[i]
    var photoElement = element.querySelector('.cell-image');

    if (photoElement != null) {
      var photo = photoElement.getAttribute('src')

      var match = (photo === path)
      if (match === true) {
        return true;
      }
    }
  }

  return false;
}

function createGrid(value) {
  console.log("value=" + value);
  loadDefaultMeetingAttendees(value);

  reStyleMeetingGrid();
}

/* 
Modal Attendee Gallery
*/
const modal = document.getElementById("updateScreen");

function showModal(context) {
  modal.style.display = "block";
  updateContext = context;

  var meetingDetails = document.querySelector('.meeting-details');
  var nodes = meetingDetails.getElementsByTagName('*');
  for(var i = 0; i < nodes.length; i++){
      nodes[i].disabled = true;
  }

  var container = document.getElementById("camera-modal");
  loadCamera(container, 240);
}

function hideModal() {
  modal.style.display = "none";

  var meetingDetails = document.querySelector('.meeting-details');
  var nodes = meetingDetails.getElementsByTagName('*');
  for(var i = 0; i < nodes.length; i++){
      nodes[i].disabled = false;
  }

  var container = document.getElementById("camera-modal");
  stopCamera(container);
  console.log("Close modal.");
}

function updateAttendee(context, newImage) {
  stopCamera(context);
  setImage(context, newImage.src);
  hideModal();
}

function updateAttendeeWebStream(context) {
  console.log(context);
  hideModal();
  insertWebStream(context);
}

function processCustomImage(context, fileSelector) {
  if (fileSelector.files && fileSelector.files[0]) {
    var reader = new FileReader();

    reader.onload = function (e) {
      stopCamera(context);

      context.innerHTML = "";

      context.innerHTML = `<img
                              onclick="javascript:showModal(this.parentNode);"
                              class="item-image"
                              src="${e.target.result}"
                              />`;
    };

    reader.readAsDataURL(fileSelector.files[0]);

  }

  hideModal();
}

function loadGalleryCards() {
  const gallery = document.getElementById("gallery");
  galleryAttendees.forEach((a) => {
    let name = a.name;
    let path = a.path;

    let galleryHtml = `<div class="card">
        <img
            onclick="javascript:updateAttendee(updateContext, this);"
            src="${a.path}" />
        <div class="card-text">
            ${a.name}
        </div>
    </div>`;

    gallery.insertAdjacentHTML("beforeend", galleryHtml);
  });
}
