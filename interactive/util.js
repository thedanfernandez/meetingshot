function processInput(context) {
    if (context.files && context.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            var parentDiv = context.parentNode;
            var targetImage = parentDiv.querySelector('.custom-image');
            targetImage.setAttribute('src', e.target.result);
        }

        reader.readAsDataURL(context.files[0]);
    }
};


function capture() {
    // Prepare video background because we know that html2canvas doesn't deal with those.
    video = document.getElementById('video');
    canvas = document.getElementById('staticpicture');
    photo = document.getElementById('camera-placeholder');

    var context = canvas.getContext('2d');

    width = 500;
    height = video.videoHeight / (video.videoWidth / width);

    if (isNaN(height)) {
        height = width / (4 / 3);
    }

    canvas.width = width;
    canvas.height = height;
    context.drawImage(video, 0, 0, width, height);

    document.querySelector('.hidden-custom-image').style.visibility = "visible"

    var data = canvas.toDataURL('image/png');
    photo.setAttribute('src', data);

    html2canvas(document.querySelector("#main-block")).then(canvas => {
        document.body.appendChild(canvas)
    })

    document.querySelector('.hidden-custom-image').style.visibility = "hidden"
}