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
var counter =0;


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
    if(client == 1){
        f('client').style.color = 'rgb(0, 255, 0)';
        f('client').style.textShadow = '0px 0px 20px rgba(0, 255, 0, .7)';
    }else{
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
    fetch('/stop/'+n).then().catch(function (error) {
        console.log(error)
    })
    f('message').innerHTML = f('stopped').innerHTML;
}

function increase(n) {
    fetch('/increase').then().catch(function (error) {
        console.log(error)
    })
}

function loop() {
    fetch('/getgamedata').then(function (response) {
        return response.json()
    }).then(function (json) {
        var time = json.time;
        var status = json.status;
        var second = time.substr(4, 1) * 1;
        var c = ':';
        f('d5').innerHTML = time.substr(0, 1);
        f('d4').innerHTML = time.substr(1, 1);
        f('d3').innerHTML = time.substr(3, 1);
        f('d2').innerHTML = time.substr(4, 1);
        f('d1').innerHTML = time.substr(6, 1);
        f('d0').innerHTML = time.substr(7, 1);
        if(status == PLAYING){
            if (second % 2 == 0) {
                c = ':';
            } else {
                c = ' ';
            }
        }else{
            c = ':';
        }
        f('c0').innerHTML = c;
        f('c1').innerHTML = c;
        f('message').innerHTML = time;
        if (client == 1) {
            f('myhint').innerHTML = json.hint1;
            f('opponenthint').innerHTML = json.hint2;
        } else {
            f('myhint').innerHTML = json.hint2;
            f('opponenthint').innerHTML = json.hint1;
        }
        if(status == ONSTART){
            counter++;
            if(counter%FREQ > FREQ/2){
                f('clock').innerHTML = f('startsoon').innerHTML;
            }else{
                f('clock').innerHTML = '';
            }
        }else if(status == FINISHED1 || status == FINISHED2){
            if(client == 1 && status == FINISHED1 || client == 2 && status == FINISHED2){
                f('clock').innerHTML = f('wewon').innerHTML;
            }else {
                f('clock').innerHTML = f('otherswon').innerHTML;
            }
        }else{
            f('clock').innerHTML = '';
        }
        
    }).catch(function (error) {
        f('clock').innerHTML = f('noconnection').innerHTML;
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
