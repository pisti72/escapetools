const ONSTART = 0;
const PAUSED = 1;
const ONSTOP = 2;
const PLAYING = 4;
const FINISHED1 = 5;
const FINISHED2 = 6;
const FREQ = 50;


var thread;
var fullscreen = false;
var client = 0;

function startClient(n) {
    client = n;
    if (client == 1) {
        document.body.style.color = 'rgb(0, 255, 0)';
        document.body.style.textShadow = '0px 0px 20px rgba(0, 255, 0, .7)';
    } else {
        document.body.style.color = 'rgb(255, 0, 0)';
        document.body.style.textShadow = '0px 0px 20px rgba(255, 0, 0, .7)';
    }
    f('inic').style.display = 'none';
    toggleFullscreen();
    thread = setInterval('loopClient()', FREQ);
}

function getmyip() {
    fetch('/getmyip').then(function (response) {
        return response.json()
    }).then(function (json) {
        f('message').innerHTML = json.ip + ':' + json.port;
    }).catch(function (error) {
        f('message').innerHTML = f('noconnection').innerHTML;
    })

}
function changeclient(n) {
    f('server').style.display = 'none';
    f('client').style.display = 'block';
    client = n;
    if (client == 1) {
        f('client').style.color = 'rgb(0, 255, 0)';
        f('client').style.textShadow = '0px 0px 20px rgba(0, 255, 0, .7)';
    } else {
        f('client').style.color = 'rgb(255, 0, 0)';
        f('client').style.textShadow = '0px 0px 20px rgba(255, 0, 0, .7)';
    }
    thread = setInterval('loop()', FREQ);
}

function hint(n) {
    fetch('/givehint/' + (n - 1)).then().catch(function (error) {
        f('message').innerHTML = f('noconnection').innerHTML;
    })
    f('message').innerHTML = f('hintgiven').innerHTML + n;
}

function changelang(n) {
    window.location.href = '/' + n;
}

function start() {
    fetch('/start').then().catch(function (error) {
        f('message').innerHTML = f('noconnection').innerHTML;
    })
    f('clock').innerHTML = '';
    //f('message').innerHTML = 'Game started';
    thread = setInterval('loop()', 481);
}

function pause() {
    fetch('/pause').then().catch(function (error) {
        console.log(error)
    })
    f('message').innerHTML = f('paused').innerHTML;
}

function inic() {
    fetch('/inic').then().catch(function (error) {
        console.log(error)
    })
    f('message').innerHTML = f('inicialized').innerHTML;
}

function stop(n) {
    fetch('/stop/' + n).then().catch(function (error) {
        console.log(error)
    })
    f('message').innerHTML = f('stopped').innerHTML;
}

function incOneMin() {
    fetch('/inconemin').then().catch(function (error) {
        console.log(error)
    })
}

function decOneMin() {
    fetch('/deconemin').then().catch(function (error) {
        console.log(error)
    })
}

function loopClient() {
    fetch('/getplayer/' + client).then(function (response) {
        return response.json()
    }).then(function (json) {
        var time = json.time;
        
        f('message').innerHTML = json.message;

        f('d5').innerHTML = time.substr(0, 1);
        f('d4').innerHTML = time.substr(1, 1);
        f('c1').innerHTML = time.substr(2, 1);
        f('d3').innerHTML = time.substr(3, 1);
        f('d2').innerHTML = time.substr(4, 1);
        f('c0').innerHTML = time.substr(5, 1);
        f('d1').innerHTML = time.substr(6, 1);
        f('d0').innerHTML = time.substr(7, 1);

        f('hinttext').innerHTML = json.hinttext;
        f('hints').innerHTML = json.hints;
        f('opphinttext').innerHTML = json.opphinttext;
        f('opphints').innerHTML = json.opphints;
    }).catch(function (error) {
        f('message').innerHTML = 'Connection lost';
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
