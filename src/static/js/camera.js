// Source: https://github.com/mdn/samples-server/blob/master/s/webrtc-capturestill/capture.js

var width = 320;
var height = 0;

var streaming = false;

var video = null;
var canvas = null;
var photo = null;
var startbutton = null;

// Loads the camera. The containerDiv argument tells us where the container is where we need to look up elements for camera
// stream ingestion.
function loadCamera(containerDiv) {
    console.log("Loading camera.")
    startup(containerDiv);
};

function startup(containerDiv) {
    container = document.getElementById(containerDiv);

    video = container.querySelector('.video-streamer');
    canvas = container.querySelector('.video-canvas');
    photo = container.querySelector('.video-snapshot');
    startbutton = document.getElementById('startbutton');

    navigator.mediaDevices.getUserMedia({ video: true, audio: false })
        .then(function (stream) {
            if (typeof video.srcObject == "object") {
                video.srcObject = stream;
            } else {
                video.src = window.URL.createObjectURL(stream)
            }
            video.play();
        })
        .catch(function (err) {
            console.log("An error occurred: " + err);
        });

    video.addEventListener('canplay', function (ev) {
        if (!streaming) {
            height = video.videoHeight / (video.videoWidth / width);

            // Firefox currently has a bug where the height can't be read from
            // the video, so we will make assumptions if this happens.

            if (isNaN(height)) {
                height = width / (4 / 3);
            }

            video.setAttribute('width', width);
            video.setAttribute('height', height);
            canvas.setAttribute('width', width);
            canvas.setAttribute('height', height);
            streaming = true;
        }
    }, false);

    startbutton.addEventListener('click', function (ev) {
        takepicture();
        ev.preventDefault();
    }, false);

    clearphoto();
}

// Fill the photo with an indication that none has been
// captured.

function clearphoto() {
    var context = canvas.getContext('2d');
    context.fillStyle = "#AAA";
    context.fillRect(0, 0, canvas.width, canvas.height);

    var data = canvas.toDataURL('image/png');
    photo.setAttribute('src', data);
}

// Capture a photo by fetching the current contents of the video
// and drawing it into a canvas, then converting that to a PNG
// format data URL. By drawing it on an offscreen canvas and then
// drawing that to the screen, we can change its size and/or apply
// other changes before drawing it.

function takepicture() {
    var context = canvas.getContext('2d');
    if (width && height) {
        canvas.width = width;
        canvas.height = height;
        context.drawImage(video, 0, 0, width, height);

        var data = canvas.toDataURL('image/png');
        photo.setAttribute('src', data);
    } else {
        clearphoto();
    }
}

function stopCamera(containerDiv) {
    container = document.getElementById(containerDiv);
    video = container.querySelector('.video-streamer');
    
    video.srcObject = null;

    navigator.mediaDevices.getUserMedia({ video: true, audio: false }).then(
        function (stream) {
            console.log(stream.getTracks().length);

            stream.getTracks().forEach(function (track) { 
                track.stop();
            });

            console.log(stream.getTracks().length);
        }).catch(
            function (error) {
                console.log('getUserMedia() error', error);
            });

}