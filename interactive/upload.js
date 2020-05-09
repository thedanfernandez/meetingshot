function processInput (context) {
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