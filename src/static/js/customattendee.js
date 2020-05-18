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
    case 4:
      removeImageCss(meetingGrid);
      break;
    case 3:
      meetingGrid.childNodes[2].className = "cell3g-3";
      removeImageCss(meetingGrid);
      break;
    case 2:
      meetingGrid.childNodes[0].className = "cell2g";
      meetingGrid.childNodes[1].className = "cell2g";
      removeImageCss(meetingGrid);
      break;
    case 1:
      meetingGrid.childNodes[0].className = "cell1g-1";
      let item = meetingGrid.childNodes[0].querySelectorAll("img");
      console.log(item);
      item[0].className = "cell1g-img";

      break;
    default:
      break;
  }
}

function removeImageCss(el) {
  let imgMatches = el.querySelectorAll("img");
  imgMatches.forEach((x) => (x.className = ""));
}

function loadDefaultMeetingAttendees(attendeeCount) {
  loadMeetingAttendees(galleryAttendees.slice(0, attendeeCount));
}

const attendeeCount = document.getElementById("attendeeCount");

attendeeCount.addEventListener("change", (event) => {
  createGrid(event.target.value);
});

function createGrid(value) {
  const meetingGrid = document.getElementById("meetingGrid");

  //switch style based on # of attendees
  if (value >= 5 && value <= 9) {
    meetingGrid.className = "grid grid-border grid-3row-3col";
  } else if (value >= 3 && value <= 4) {
    meetingGrid.className = "grid grid-border grid-2row-2col";
  } else if (value >= 1 && value <= 2) {
    meetingGrid.className = "grid grid-border grid-1row-2col";
  }
  console.log("value=" + value);
  loadDefaultMeetingAttendees(value);
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
