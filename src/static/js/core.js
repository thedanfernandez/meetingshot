// Core load events that need to be triggered when the page loads.
window.addEventListener("load", loadDefaultMeetingAttendees(6), false);
window.addEventListener("load", loadGalleryCards, false);

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

function insertWebStream(context) {
    context.innerHTML = "";

    context.innerHTML = `<div id="webcamContainer" class="main-page-video-container" onclick="javascript:showModal(this.parentNode);">
                            <canvas class="video-canvas hidden-custom-image"></canvas>
                            <img class="custom-image hidden-custom-image video-snapshot" id="photo" alt="The screen capture will appear in this box.">
                            <div id="videoDiv" class="container">
                                <video autoplay="true" class="video-streamer main-page-video">

                                </video>
                            </div>
                        </div>`;

    loadCamera(context, 320);
}

function setImage(context, source) {
    context.innerHTML = "";

    context.innerHTML = `<img
                            onclick="javascript:showModal(this.parentNode);"
                            class="cell-image"
                            src="${source}"
                            />`;
}

var attendeeCount = document.getElementById("attendeeCount");

function loadDefaultMeetingAttendees(attendeeCount) {
    attendeeCount.value = attendeeCount
    loadMeetingAttendees(galleryAttendees.slice(0, attendeeCount));
}

attendeeCount.addEventListener("change", (event) => {
    //createGrid(event.target.value);
    setAttendeeConstraint(event.target.value);
});


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