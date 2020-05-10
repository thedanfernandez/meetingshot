// Core load events that need to be triggered when the page loads.
window.addEventListener("load", loadMeetingAttendees, false);
window.addEventListener("load", loadGalleryCards, false);

function insertWebStream(context){
    context.innerHTML = ""

    context.innerHTML = `<div id="webcamContainer" class="main-page-video-container" onclick="javascript:showModal(this.parentNode);">
                            <canvas id="staticpicture" class="hidden-custom-image"></canvas>
                            <img class="custom-image hidden-custom-image" id="photo" alt="The screen capture will appear in this box.">
                            <div id="videoDiv" class="container">
                                <video autoplay="true" class="video-streamer main-page-video">

                                </video>
                            </div>
                        </div>`;

    loadCamera(context, 320)
}

function setImage(context, source) {
    context.innerHTML = ""

    context.innerHTML = `<img
                            onclick="javascript:showModal(this.parentNode);"
                            class="item-image"
                            src="${source}"
                            />`;
}