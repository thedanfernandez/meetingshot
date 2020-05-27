var updateContext = "";


/* 
Modal Attendee Gallery
*/
const modal = document.getElementById("updateScreen");


function insertWebStream(context) {
  context.innerHTML = "";

  context.innerHTML = `
                      <div class="main-page-video-container">
                          <canvas data-html2canvas-ignore="true" class="video-canvas"></canvas>
                          <img class="hidden-custom-image" alt="The screen capture will appear in this box.">
                          <div data-html2canvas-ignore="true" class="container">
                              <video autoplay="true" class="video-streamer main-page-video">

                              </video>
                          </div>
                          <div data-html2canvas-ignore="true" onclick="javascript:showModal(this.parentNode);" class="option-overlay"><img src="static/images/image.svg"></img></div>
                      </div>`;

  loadCamera(context, context.width);
}

function setImage(context, source) {
  context.innerHTML = "";

  context.innerHTML = `<div class="cell-container"><img
                          class="cell-image"
                          src="${source}"
                          />
                       <div data-html2canvas-ignore="true" onclick="javascript:showModal(this.parentNode);" class="option-overlay"><img src="static/images/image.svg"></img></div>
                       </div>`;
}

function showModal(context) {
  modal.style.display = "flex";
  updateContext = context;

  var meetingDetails = document.querySelector('.light-color-block');
  var nodes = meetingDetails.getElementsByTagName('*');
  for (var i = 0; i < nodes.length; i++) {
    nodes[i].disabled = true;
  }

  var container = document.getElementById("camera-modal");
  loadCamera(container, 240);

  ga('send', 'event', 'Actions', 'load_modal', "custom_attendee");
}

function hideModal() {
  modal.style.display = "none";

  var meetingDetails = document.querySelector('.light-color-block');
  var nodes = meetingDetails.getElementsByTagName('*');
  for (var i = 0; i < nodes.length; i++) {
    nodes[i].disabled = false;
  }

  var container = document.getElementById("camera-modal");
  stopCamera(container);

  ga('send', 'event', 'Actions', 'hide_modal', "custom_attendee");
}

function updateAttendee(context, newImage) {
  setImage(context, newImage.src);
  hideModal();

  ga('send', 'event', 'Actions', 'update_attendee_precooked_image', newImage.src);
}

function updateAttendeeWebStream(context) {
  hideModal();
  insertWebStream(context);

  ga('send', 'event', 'Actions', 'update_attendee_webcam', "custom_attendee_modal");
}

function processCustomImage(context, fileSelector) {
  console.log("Processing custom image.");
  if (fileSelector.files && fileSelector.files[0]) {
    console.log("Context custom image is in:" + context)
    var reader = new FileReader();

    reader.onload = function (e) {
      try {
        stopCamera(context);
      } catch (e) {
        console.log("Error stopping camera: " + e);
      }

      console.log(context);
      context.innerHTML = "";

      context.innerHTML = `<img
                              onclick="javascript:showModal(this.parentNode);"
                              class="cell-image"
                              src="${e.target.result}"
                              />
                              <div data-html2canvas-ignore="true" onclick="javascript:showModal(this.parentNode);" class="option-overlay"><img src="static/images/image.svg"></img></div>`;
    };

    console.log("Exited file picker.");
    reader.readAsDataURL(fileSelector.files[0]);
  }

  fileSelector.value = null;

  hideModal();
  ga('send', 'event', 'Actions', 'update_attendee_custom_image', "custom_attendee_modal");
}

function loadGalleryCards() {
  const gallery = document.getElementById("gallery");
  galleryAttendees.forEach((a) => {
    let name = a.name;
    let path = a.path;

    let galleryHtml = `<div class="card">
        <div class="card-image-container">
        <img
            onclick="javascript:updateAttendee(updateContext, this);"
            src="${a.path}" />
        </div>
        <div class="card-text">
            ${a.name}
        </div>
    </div>`;

    gallery.insertAdjacentHTML("beforeend", galleryHtml);
  });
}
