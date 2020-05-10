var updateContext = "";

function loadMeetingAttendees(attendeeCount) {
  //assuming no querystring params to rehydrate

  const meetingGrid = document.getElementById("meetingGrid");

  meetingGrid.innerHTML = "";

  //TODO: Change to be dynamic
  for (let i = 0; i < 6; i++) {
    let attendeeHtml = `<div class="cell">
            <img
              onclick="javascript:showModal(this.parentNode);"
              class="cell-image"
              src="${galleryAttendees[i].path}"
            />
          </div>`;
    meetingGrid.insertAdjacentHTML("beforeend", attendeeHtml);
  }
}
/* 
Modal Attendee Gallery
*/
const modal = document.getElementById("updateScreen");

function showModal(context) {
  modal.style.display = "block";
  updateContext = context;

  var container = document.getElementById("camera-modal");
  loadCamera(container, 240);
}

function hideModal() {
  modal.style.display = "none";

  var container = document.getElementById("camera-modal");
  stopCamera(container);
  console.log("Close modal.");
}

function updateAttendee(newImage) {
  var targetImage = updateContext.querySelector(".item-image");
  targetImage.src = newImage.src;
  hideModal();
}

function updateAttendeeWebStream(context) {
  console.log(context);
  hideModal();
  insertWebStream(context);
}

function loadGalleryCards() {
  const gallery = document.getElementById("gallery");
  galleryAttendees.forEach((a) => {
    let name = a.name;
    let path = a.path;

    let galleryHtml = `<div class="card">
        <img
            onclick="javascript:updateAttendee(this);"
            src="${a.path}" />
        <div class="card-text">
            ${a.name}
        </div>
    </div>`;

    gallery.insertAdjacentHTML("beforeend", galleryHtml);
  });
}
