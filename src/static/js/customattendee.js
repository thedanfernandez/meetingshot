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
                          <div data-html2canvas-ignore="true" onclick="javascript:showModal(this.parentNode);" class="option-overlay"><img src="../static/images/image.svg"></img></div>
                      </div>`;

  loadCamera(context, context.width);
}

function setImage(context, source) {
  context.innerHTML = "";

  context.innerHTML = `<div class="cell-container"><img
                          class="cell-image"
                          src="${source}"
                          />
                       <div data-html2canvas-ignore="true" onclick="javascript:showModal(this.parentNode);" class="option-overlay"><img src="../static/images/image.svg" alt="Overlay over attendee image that allows picking other images."></img></div>
                       </div>`;
}

function enableItemsBehindModal() {
  var meetingDetails = document.querySelector('.light-color-block');
  var nodes = meetingDetails.getElementsByTagName('*');
  for (var mdIterator = 0; mdIterator < nodes.length; mdIterator++) {
    nodes[mdIterator].disabled = false;
  }

  var meetingGrid = document.getElementById('meetingGrid');
  var gridNodes = meetingGrid.getElementsByTagName('*');
  for (var gnIterator = 0; gnIterator < nodes.length; gnIterator++) {
    gridNodes[gnIterator].disabled = false;
  }
}

function disableItemsBehindModal() {
  var meetingDetails = document.querySelector('.light-color-block');
  var nodes = meetingDetails.getElementsByTagName('*');
  for (var mdIterator = 0; mdIterator < nodes.length; mdIterator++) {
    nodes[mdIterator].disabled = true;
  }

  var meetingGrid = document.getElementById('meetingGrid');
  var gridNodes = meetingGrid.getElementsByTagName('*');
  for (var gnIterator = 0; gnIterator < nodes.length; gnIterator++) {
    console.log("Disabling " + gridNodes[gnIterator])
    gridNodes[gnIterator].disabled = true;
  }
}

function showModal(context) {
  modal.style.display = "flex";
  updateContext = context;

  disableItemsBehindModal();

  var container = document.getElementById("camera-modal");
  loadCamera(container, 240);

  try {
    ga('send', 'event', 'Actions', 'load_modal', "custom_attendee_modal");
  } catch (e) {
    console.log(e);
  }
}

function hideModal() {
  modal.style.display = "none";

  enableItemsBehindModal();

  var container = document.getElementById("camera-modal");
  stopCamera(container);

  try {
    ga('send', 'event', 'Actions', 'hide_modal', "custom_attendee_modal");
  } catch (e) {
    console.log(e);
  }
}

function updateAttendee(context, newImage) {
  setImage(context, newImage.src);
  hideModal();

  try {
    ga('send', 'event', 'Actions', 'update_attendee_precooked_image', newImage.src);
  } catch (e) {
    console.log(e);
  }
}

function updateAttendeeWebStream(context) {
  hideModal();
  insertWebStream(context);

  try {
    ga('send', 'event', 'Actions', 'update_attendee_webcam', "custom_attendee_modal");
  } catch (e) {
    console.log(e);
  }
}

function processCustomImage(context, fileSelector) {
  if (fileSelector.files && fileSelector.files[0]) {
    var reader = new FileReader();

    reader.onload = function (e) {
      try {
        stopCamera(context);
      } catch (e) {
        console.log("Error stopping camera: " + e);
      }

      context.innerHTML = "";

      context.innerHTML = `<img
                              onclick="javascript:showModal(this.parentNode);"
                              class="cell-image"
                              src="${e.target.result}"
                              />
                              <div data-html2canvas-ignore="true" onclick="javascript:showModal(this.parentNode);" class="option-overlay"><img src="../static/images/image.svg" alt="Overlay over attendee image that allows picking other images."></img></div>`;
    };

    reader.readAsDataURL(fileSelector.files[0]);
  }

  fileSelector.value = null;

  hideModal();

  try {
    ga('send', 'event', 'Actions', 'update_attendee_custom_image', "custom_attendee_modal");
  } catch (e) {
    console.log(e);
  }
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
            src="${a.path}" alt="Image of ${a.name}" />
        </div>
        <div class="card-text">
            ${a.name}
        </div>
    </div>`;

    gallery.insertAdjacentHTML("beforeend", galleryHtml);
  });
}
