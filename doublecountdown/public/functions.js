var thread;
var fullscreen=false;
var client = 0;

function test() {
    fetch('/getmyip').then(function (response) {
        return response.json()
    }).then(function (json) {
        f('message').innerHTML = json.ip + ':' + json.port;
    }).catch(function (error) {
        f('message').innerHTML = 'Server not available';
    })

}
function client(n) {
    f('server').style.display = 'none';
    f('client').style.display = 'block';
    client = n;
    thread = setInterval('loop()', 50);
}

function hint(){
    fetch('/start').then().catch(function (error) {
        console.log(error)
    })
    f('message').innerHTML = 'Game started';
}

function start(){
    fetch('/start').then().catch(function (error) {
        console.log(error)
    })
    f('message').innerHTML = 'Game started';
}

function pause(){
    fetch('/pause').then().catch(function (error) {
        console.log(error)
    })
    f('message').innerHTML = 'Game paused';
}

function loop() {
    fetch('/getgamedata').then(function (response) {
        return response.json()
    }).then(function (json) {
        var time = json.time
        f('d5').innerHTML = time.substr(0, 1);
        f('d4').innerHTML = time.substr(1, 1);
        f('d3').innerHTML = time.substr(3, 1);
        f('d2').innerHTML = time.substr(4, 1);
        f('d1').innerHTML = time.substr(6, 1);
        f('d0').innerHTML = time.substr(7, 1);
    }).catch(function (error) {
        f('clock').innerHTML = 'Server not available';
    })
}

function toggleFullscreen() {
    if (
        document.fullscreenEnabled ||
        document.webkitFullscreenEnabled ||
        document.mozFullScreenEnabled ||
        document.msFullscreenEnabled) {
        var d = document.body;
        if (!fullscreen) {
            fullscreen = true;
            //f('fullscreen').innerHTML = EMPTY;
            //f('fullscreen').style.display = 'none';
            if (d.requestFullscreen) {
                d.requestFullscreen();
            } else if (d.webkitRequestFullscreen) {
                d.webkitRequestFullscreen();
            } else if (d.mozRequestFullScreen) {
                d.mozRequestFullScreen();
            } else if (d.msRequestFullscreen) {
                d.msRequestFullscreen();
            }
        } else {
            fullscreen = false;
            //f('fullscreen').style.display = 'block';
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }
        }
    }
}

function f(n) {
    return document.getElementById(n);
}
