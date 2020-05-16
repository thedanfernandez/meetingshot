// Core load events that need to be triggered when the page loads.
window.addEventListener("load", loadDefaultMeetingAttendees(6), false);
window.addEventListener("load", loadGalleryCards, false);

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
