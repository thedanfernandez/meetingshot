// Core load events that need to be triggered when the page loads.
window.addEventListener("load", loadMeetingAttendees(6), false);
window.addEventListener("load", loadGalleryCards, false);
window.addEventListener("load", updateMeetingAttendeeCounter, false);

function loadMeetingAttendees(attendeeCount) {
  //create an array of attendee lists
  attendeeList = galleryAttendees.slice(0, attendeeCount);

  const meetingGrid = document.getElementById("meetingGrid");

  meetingGrid.innerHTML = "";

  for (let i = 0; i < attendeeList.length; i++) {
    let attendeeHtml = `<div class="cell">
              <div class="cell-container">
                <img
                    class="cell-image"
                    alt="Meeting photo of ${attendeeList[i].name}"
                    src="${attendeeList[i].path}"
                />
                <div data-html2canvas-ignore="true" onclick="javascript:showModal(this.parentNode);" class="option-overlay">
                    <img src="static/images/image.svg" />
                </div>
              </div>
            </div>`;
    meetingGrid.insertAdjacentHTML("beforeend", attendeeHtml);
  }

  //get child nodes here
  reStyleGridCells(attendeeCount);
}

function reStyleGridCells(attendeeCount) {
  const meetingGrid = document.getElementById("meetingGrid");

  console.log("Inside reStyleGridCells: " + attendeeCount);

  switch (parseInt(attendeeCount)) {
    case 9:
      setallChildNodesCss(meetingGrid, "cell");
      break;
    case 8:
      setallChildNodesCss(meetingGrid, "cell");
      meetingGrid.childNodes[6].className = "cell8g-7";
      meetingGrid.childNodes[7].className = "cell8g-8";
      break;
    case 7:
      setallChildNodesCss(meetingGrid, "cell");
      meetingGrid.childNodes[6].className = "cell7g-7";
      break;
    case 6:
      setallChildNodesCss(meetingGrid, "cell");
      break;
    case 5:
      setallChildNodesCss(meetingGrid, "cell");
      meetingGrid.childNodes[3].className = "cell5g-4";
      meetingGrid.childNodes[4].className = "cell5g-5";
      break;
    case 4:
      setallChildNodesCss(meetingGrid, "cell");

      break;
    case 3:
      console.log("inside 3!");
      setallChildNodesCss(meetingGrid, "cell");
      meetingGrid.childNodes[2].className = "cell3g-3";
      break;
    case 2:
      setallChildNodesCss(meetingGrid, "cell");
      meetingGrid.childNodes[0].className = "cell2g";
      meetingGrid.childNodes[1].className = "cell2g-2";
      break;
    case 1:
      setallChildNodesCss(meetingGrid, "cell");
      meetingGrid.childNodes[0].className = "cell1g-1";

      break;
    default:
      console.log("I should never be here");
      break;
  }

  setNodeImageCss(parseInt(attendeeCount));
}

function setallChildNodesCss(el, style) {
  el.childNodes.forEach((x) => (x.className = style));
}

//Set CSS for Image 1 in cell 1
function setNodeImageCss(attendeeCount) {
  const meetingGrid = document.getElementById("meetingGrid");
  if (parseInt(attendeeCount) === 1) {
    let item = meetingGrid.childNodes[0].querySelectorAll("img");
    console.log("image: " + item);
    item[0].className = "cell1g-img";
  } else {
    let item = meetingGrid.childNodes[0].querySelectorAll("img");
    console.log("image: " + item);
    item[0].className = "cell-image";
  }
}

// Switch style based on # of attendees
function reStyleMeetingGrid(attendeeCount) {
  console.log("Re-styling for " + attendeeCount);
  const meetingGrid = document.getElementById("meetingGrid");

  if (attendeeCount >= 5 && attendeeCount <= 9) {
    meetingGrid.className = "grid grid-border grid-3row-3col";
  } else if (attendeeCount >= 3 && attendeeCount <= 4) {
    meetingGrid.className = "grid grid-border grid-2row-2col";
  } else if (attendeeCount >= 1 && attendeeCount <= 2) {
    meetingGrid.className = "grid grid-border grid-1row-2col";
  }

  reStyleGridCells(attendeeCount);
}

// It's important to use this function to preserve the user's choices for previous
// images and selections. Otherwise the grid is re-created.
function setAttendeeConstraint(attendeeCount) {
  var meetingGrid = document.getElementById("meetingGrid");
  var childCount = meetingGrid.childElementCount;

  // We need to reduce child elements.
  if (childCount > attendeeCount) {
    var elementsToRemove = childCount - attendeeCount;

    for (iterator = 0; iterator < elementsToRemove; iterator++) {
      var elementToRemove = meetingGrid.childNodes[childCount - 1 - iterator];
      var videoContainer = elementToRemove.querySelector(
        ".main-page-video-container"
      );

      if (videoContainer) {
        console.log("Need to stop the camera.");
        stopCamera(videoContainer);
      }

      meetingGrid.removeChild(elementToRemove);
    }
  } else if (childCount < attendeeCount) {
    // We need to add meeting attendees.
    var elementsToAdd = attendeeCount - childCount;

    console.log("To add: " + elementsToAdd);

    for (iterator = 0; iterator < elementsToAdd; iterator++) {
      console.log("Adding attendee, iteration " + iterator);
      var randomAttendee = 0;
      var imagePath = "";
      var imageName = "";
      do {
        randomAttendee = getRandomAttendeeId();
        imagePath = galleryAttendees[randomAttendee].path;
        imageName = galleryAttendees[randomAttendee].name;
      } while (imageExistsInGrid(imagePath));

      let attendeeHtml = `<div class="cell">
                            <div class="cell-container">
                              <img
                                class="cell-image"
                                alt="Meeting photo of ${imageName}"
                                src="${imagePath}"
                              />
                              <div data-html2canvas-ignore="true" onclick="javascript:showModal(this.parentNode);" class="option-overlay">
                                <img src="static/images/image.svg" />
                              </div>
                            </div>
                          </div>`;

      meetingGrid.insertAdjacentHTML("beforeend", attendeeHtml);
    }
  }

  updateMeetingAttendeeCounter();
  reStyleMeetingGrid(attendeeCount);
}

function removeHighlightEntirely() {
  var meetingGrid = document.getElementById("meetingGrid");
  for (
    meetingGridChild = 0;
    meetingGridChild < meetingGrid.childElementCount;
    meetingGridChild++
  ) {
    var targetAttendee = meetingGrid.childNodes[meetingGridChild];
    if (targetAttendee.classList.contains("attendee-highlight")) {
      targetAttendee.classList.remove("attendee-highlight");
    }
  }
}

function setAttendeeHighlight(highlightCellId) {
  var meetingGrid = document.getElementById("meetingGrid");

  removeHighlightEntirely();

  if (highlightCellId.toLowerCase() != "none") {
    var targetAttendee = meetingGrid.childNodes[highlightCellId - 1];
    if (!targetAttendee.classList.contains("attendee-highlight")) {
      targetAttendee.classList.add("attendee-highlight");
    }
  }
}

selectAttendeeCount.addEventListener("change", (event) => {
  setAttendeeConstraint(event.target.value);
});

attendeeHighlight.addEventListener("change", (event) => {
  setAttendeeHighlight(event.target.value);
});

function getRandomAttendeeId() {
  var generatedNumber = Math.floor(
    Math.random() * Math.floor(galleryAttendees.length)
  );
  return generatedNumber;
}

// Checks if an image already exists in the grid. This is important when we recreate the grid
// because ideally we don't want to duplicate an image in the attendee list.
function imageExistsInGrid(path) {
  var meetingGrid = document.getElementById("meetingGrid");

  for (i = 0; i < meetingGrid.childElementCount; i++) {
    var element = meetingGrid.childNodes[i];
    var photoElement = element.querySelector(".cell-image");

    if (photoElement != null) {
      var photo = photoElement.getAttribute("src");

      var match = photo === path;
      if (match === true) {
        return true;
      }
    }
  }

  return false;
}

function updateMeetingAttendeeCounter() {
  var counterLabel = document.getElementById("counterLabel");
  counterLabel.innerHTML = document.getElementById(
    "meetingGrid"
  ).childElementCount;
}

function exportImage() {
  // Prepare video background because we know that html2canvas doesn't deal with those.
  var meetingGrid = document.getElementById("meetingGrid");
  // main-page-video-container

  var containers = meetingGrid.getElementsByClassName(
    "main-page-video-container"
  );

  for (
    exportIterator = 0;
    exportIterator < containers.length;
    exportIterator++
  ) {
    console.log("There is a video container we need to process.");

    var container = containers[exportIterator];
    var video = container.querySelector(".main-page-video");
    var canvas = container.querySelector(".video-canvas");
    var photo = container.querySelector(".hidden-custom-image");
    var context = canvas.getContext("2d");

    console.log(container);
    console.log(video);
    console.log(canvas);
    console.log(photo);

    width = video.videoWidth;
    height = video.videoHeight / (video.videoWidth / width);

    if (isNaN(height)) {
      height = width / (4 / 3);
    }

    canvas.width = width;
    canvas.height = height;
    context.drawImage(video, 0, 0, width, height);

    photo.style.visibility = "visible";

    var data = canvas.toDataURL("image/png");
    photo.setAttribute("src", data);
  }

  document.documentElement.classList.add("hide-scrollbar");

  var targetElement = document.querySelector("#meetingComposition");
  console.log(targetElement.clientWidth);

  html2canvas(targetElement, {
    scrollX: 0,
    scrollY: -window.scrollY,
    allowTaint: false,
    scale: 1.0,
    width: targetElement.clientWidth,
  }).then((canvas) => {
    var a = document.createElement("a");
    a.href = canvas.toDataURL();
    a.download = "meetingshot-generated-image.png";
    a.click();
  });

  document.documentElement.classList.remove("hide-scrollbar");

  document.querySelector(".hidden-custom-image").style.visibility = "hidden";
  document.querySelector(".main-page-video").style.visibility = "visible";
}
