const url = 'api.php';
const STATE_WELCOME = 0;
const STATE_SHOT = 1;
const STATE_PREVIEW = 2;
const STATE_SEND = 3;
var counter = 0;
var state = STATE_WELCOME;
var canvas = f('canvas');
var video = f('video');
var imageToSend = {};
var promise = navigator.mediaDevices.getUserMedia({ video: true })
    .then(function (stream) {
        /* use the stream */
        video.srcObject = stream;
        video.onloadedmetadata = function (e) {
            video.play();
        };
    })
    .catch(function (err) {
        /* handle the error */
        console.log(err.name + ": " + err.message);
    });

f('container').addEventListener("click", function () {
    if (state == STATE_WELCOME) {
        state = STATE_SHOT;
        hide('welcome');
        show('shot');
    }
});

setInterval(function () { animation() }, 1000);

function shot() {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0);
    ctx.font = "30px Arial";
    ctx.fillStyle = "#fff";
    ctx.fillText("www.morrisons2.hu", 10, 40);
    imageToSend = canvas.toDataURL('image/jpeg', 0.8);
    if (state == STATE_SHOT) {
        state = STATE_PREVIEW;
        hide('shot');
        show('preview');
    }
}

function good() {
    if (state == STATE_PREVIEW) {
        state = STATE_SEND;
        hide('preview');
        show('send');
    }
}

function back() {
    if (state == STATE_PREVIEW) {
        state = STATE_SHOT;
        hide('preview');
        show('shot');
    }
}

function save() {
    download("my_picture.jpg", imageToSend);
}

function download(filename, image) {
    var element = document.createElement('a');
    //element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('href', image);
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}

function animation() {
    counter++;
    if (counter % 2 == 0) {
        f('title_txt').innerHTML = 'Selfie box';
        f('touch_txt').innerHTML = 'Touch the screen';
    } else {
        f('title_txt').innerHTML = 'Szelfi doboz';
        f('touch_txt').innerHTML = 'Éríntsd meg a képernyőt';
    }
}

function send() {
    var email = f('email').value;
    sendmail(email, imageToSend);
}

function sendmail(email, image) {
    var blob = image.replace('data:image/jpeg;base64,', '');
    var data = {
        email: email,
        image: blob
    };

    fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(function (response) {
        f('message').innerHTML = 'Sending...';
        return response.json()
    }).then(function (json) {
        if (json.result == 'success') {
            f('message').innerHTML = 'Mail sent';
        } else {
            f('message').innerHTML = 'Mail did not send';
        }
        f('email').value = '';
        setTimeout(
            function () {
                f('message').innerHTML = '';
                if (state == STATE_SEND) {
                    state = STATE_WELCOME;
                    hide('send');
                    show('welcome');
                }
            }, 4000);
    }).catch(function (error) {
        console.log(error);
    })
}

function hide(n) {
    f(n).style.display = 'none';
}

function show(n) {
    f(n).style.display = 'block';
}

function f(n) {
    return document.getElementById(n);
}
