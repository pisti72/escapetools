const url = 'api.php';
const STATE_WELCOME = 0;
var counter = 0;
var state = STATE_WELCOME;
var canvas = f('canvas');
var video = f('video');
var imageToSend = {};
var promise = navigator.mediaDevices.getUserMedia({video:true})
.then(function(stream) {
  /* use the stream */
  video.srcObject = stream;
  video.onloadedmetadata = function(e) {
    video.play();
  };
})
.catch(function(err) {
  /* handle the error */
  console.log(err.name + ": " + err.message);
});

//setInterval(function(){animation()},1000);

function shot(){
	canvas.width = video.videoWidth;
	canvas.height = video.videoHeight;
	ctx = canvas.getContext('2d');
	ctx.drawImage(video, 0, 0);
    ctx.font = "30px Arial";
    ctx.fillStyle = "#fff";
    ctx.fillText("www.morrisons.hu",10,40);
	imageToSend = canvas.toDataURL('image/jpeg', 0.8);
}

function save(){
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

function animation(){
    counter++;
    if(counter%2==0){
        f('title_txt').innerHTML = 'Selfie box';
        f('touch_txt').innerHTML = 'Touch the screen';
    }else{
        f('title_txt').innerHTML = 'Szelfi doboz';
        f('touch_txt').innerHTML = 'Éríntsd meg a képernyőt';
    }
}

function send() {
    var email = f('email').value;
    //var image = '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';
    sendmail(email, imageToSend);
}

function sendmail(email, image) {
    var data = {
        email: email,
        image: image
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
            function () { f('message').innerHTML = ''; }, 2000
        );
    }).catch(function (error) {
        console.log(error);
    })
}
function f(n) {
    return document.getElementById(n);
}