//load events
window.addEventListener("load", loadMeetingAttendees, false);
window.addEventListener("load", loadGalleryCards, false);

var imageToUpdate = "";

function loadMeetingAttendees(attendeeCount) {
  //assuming no querystring params to rehydrate

  const meetingGrid = document.getElementById("meetingGrid");

  meetingGrid.innerHTML = "";

  //TODO: Change to be dynamic
  for (let i = 0; i < 6; i++) {
    let attendeeHtml = `<div class="item">
            <img
              onclick="javascript:showModal(this);"
              class="item-image"
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

function showModal(imgToUpdate) {
  modal.style.display = "block";
  imageToUpdate = imgToUpdate;
}

function hideModal() {
  modal.style.display = "none";
}

function updateAttendee(newimg) {
  console.log(newimg.src);
  imageToUpdate.src = newimg.src;
  hideModal();
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
