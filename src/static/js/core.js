// Core load events that need to be triggered when the page loads.
window.addEventListener("load", loadMeetingAttendees, false);
window.addEventListener("load", loadGalleryCards, false);

var checkbox = document.querySelector("#enableWebCam");

checkbox.addEventListener('change', function () {
    if (this.checked) {
        // Webcam is enabled.

        const meetingGrid = document.getElementById("meetingGrid");

        let attendeeHtml = `<div id="webcamContainer" class="item">
                                <canvas id="staticpicture" class="hidden-custom-image"></canvas>
                                <img class="custom-image hidden-custom-image" id="photo" alt="The screen capture will appear in this box.">
                                <div id="videoDiv" class="container">
                                    <video autoplay="true" id="video">

                                    </video>
                                </div>

                                <button data-html2canvas-ignore="true" type="button" id="startbutton">Capture Image</button>
                            </div>`;
        meetingGrid.insertAdjacentHTML("beforeend", attendeeHtml);
        loadCamera();

    } else {
        // Checkbox is not checked..
    }
});

function insertWebStream(context){
    context.innerHTML = ""

    context.innerHTML = `<div id="webcamContainer" class="main-page-video-container">
                            <canvas id="staticpicture" class="hidden-custom-image"></canvas>
                            <img class="custom-image hidden-custom-image" id="photo" alt="The screen capture will appear in this box.">
                            <div id="videoDiv" class="container">
                                <video autoplay="true" class="video-streamer main-page-video">

                                </video>
                            </div>
                        </div>`;

    loadCamera(context, 320)
}