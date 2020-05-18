var updateContext = "";


/* 
Modal Attendee Gallery
*/
const modal = document.getElementById("updateScreen");


function insertWebStream(context) {
  context.innerHTML = "";

  context.innerHTML = `<div class="main-page-video-container" onclick="javascript:showModal(this.parentNode);">
                          <canvas class="video-canvas hidden-custom-image"></canvas>
                          <img class="custom-image hidden-custom-image video-snapshot" id="photo" alt="The screen capture will appear in this box.">
                          <div class="container">
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

function showModal(context) {
  modal.style.display = "block";
  updateContext = context;

  var meetingDetails = document.querySelector('.meeting-details');
  var nodes = meetingDetails.getElementsByTagName('*');
  for (var i = 0; i < nodes.length; i++) {
    nodes[i].disabled = true;
  }

  var container = document.getElementById("camera-modal");
  loadCamera(container, 240);
}

function hideModal() {
  modal.style.display = "none";

  var meetingDetails = document.querySelector('.meeting-details');
  var nodes = meetingDetails.getElementsByTagName('*');
  for (var i = 0; i < nodes.length; i++) {
    nodes[i].disabled = false;
  }

  var container = document.getElementById("camera-modal");
  stopCamera(container);
  console.log("Close modal.");
}

function updateAttendee(context, newImage) {
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
