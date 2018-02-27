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

function startControl(){
    thread = setInterval('loopControl()', 101);
}

function loopControl(){
    fetch('/getplayers').then(function (response) {
        return response.json()
    }).then(function (json) {
        f('greenmessage').innerHTML = json[0].message;
        f('redmessage').innerHTML = json[1].message;
        f('greentime').innerHTML = json[0].time;
        f('redtime').innerHTML = json[1].time;
        f('greenhint').innerHTML = 'Segitseg: ' + json[0].hints;
        f('redhint').innerHTML = 'Segitseg: ' + json[1].hints;
    }).catch(function (error) {
        f('message').innerHTML = 'Connection lost';
    })
}

function startClient(n) {
    client = n;
    if (client == 0) {
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

function hint(n) {
    fetch('/givehint/' + (n - 1)).then().catch(function (error) {
        f('message').innerHTML = f('noconnection').innerHTML;
    })
    f('message').innerHTML = f('hintgiven').innerHTML + n;
}

function setLang(n) {
    fetch('/setlang/' + n).then().catch(function (error) {
        f('message').innerHTML = f('noconnection').innerHTML;
    })
    f('message').innerHTML = f('hintgiven').innerHTML + n;
}

function start() {
    fetch('/startboth').then().catch(function (error) {
        f('message').innerHTML = f('noconnection').innerHTML;
    })
    f('message').innerHTML = '';
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
    fetch('/getplayers').then(function (response) {
        return response.json()
    }).then(function (json) {
        var time = json[client].time;
        
        f('message').innerHTML = json[client].message;

        f('d5').innerHTML = time.substr(0, 1);
        f('d4').innerHTML = time.substr(1, 1);
        f('c1').innerHTML = time.substr(2, 1);
        f('d3').innerHTML = time.substr(3, 1);
        f('d2').innerHTML = time.substr(4, 1);
        f('c0').innerHTML = time.substr(5, 1);
        f('d1').innerHTML = time.substr(6, 1);
        f('d0').innerHTML = time.substr(7, 1);

        f('hinttext').innerHTML = json[client].hinttext;
        f('hints').innerHTML = json[client].hints;
        f('opphinttext').innerHTML = json[client].opphinttext;
        if(client == 0){
            f('opphints').innerHTML = json[1].hints;
        }else{
            f('opphints').innerHTML = json[0].hints;
        }
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
