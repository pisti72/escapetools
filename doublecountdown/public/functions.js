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
var counter = 0;

function startControl() {
    loopControl();
}

function loopControl() {
    if (counter % 20 == 0) {
        fetch('/getplayers').then(function (response) {
            return response.json()
        }).then(function (json) {
            f('greenmessage').innerHTML = json.green.message;
            f('redmessage').innerHTML = json.red.message;
            f('greentime').innerHTML = json.green.time;
            f('redtime').innerHTML = json.red.time;
            f('greenhint').innerHTML = json.green.hinttext + json.green.hints;
            f('redhint').innerHTML = json.red.hinttext + json.red.hints;
            if (json.separate) {
                f('link').innerHTML = '<img height="30px" src="unlink.svg">';
            } else {
                f('link').innerHTML = '<img height="30px" src="link.svg">';
            }
        }).catch(function (error) {
            f('message').innerHTML = 'Nincs kapcsolat';
        })
    }
    counter++;
    window.requestAnimationFrame(loopControl);
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
    loopClient();
}

function getmyip() {
    fetch('/getmyip').then(function (response) {
        return response.json()
    }).then(function (json) {
        f('message').innerHTML = json.ip + ':' + json.port;
    }).catch(function (error) {
        console.log(error);
    })

}

function incHint(n) {
    fetch('/inchint/' + n).then().catch(function (error) {
        console.log(error);
    })
}

function decHint(n) {
    fetch('/dechint/' + n).then().catch(function (error) {
        console.log(error);
    })
}

function startGame() {
    fetch('/startboth').then().catch(function (error) {
        console.log(error);
    })
}

function startPlayer(n) {
    fetch('/start/' + n).then().catch(function (error) {
        console.log(error);
    })
}

function pauseGame(n) {
    fetch('/pauseboth').then().catch(function (error) {
        console.log(error)
    })
}

function pausePlayer(n) {
    fetch('/pause/' + n).then().catch(function (error) {
        console.log(error)
    })
}

function inicGame() {
    fetch('/inicboth').then().catch(function (error) {
        console.log(error)
    })
}

function inic(n) {
    fetch('/inic/' + n).then().catch(function (error) {
        console.log(error)
    })
}

function won(n) {
    fetch('/won/' + n).then().catch(function (error) {
        console.log(error)
    })
}

function incMinGame() {
    fetch('/incminboth').then().catch(function (error) {
        console.log(error)
    })
}

function decMinGame() {
    fetch('/decminboth').then().catch(function (error) {
        console.log(error)
    })
}

function incMin(n) {
    fetch('/incmin/' + n).then().catch(function (error) {
        console.log(error)
    })
}

function decMin(n) {
    fetch('/decmin/' + n).then().catch(function (error) {
        console.log(error)
    })
}

function setHunGame() {
    fetch('/sethunboth').then().catch(function (error) {
        console.log(error)
    })
}

function setHun(n) {
    fetch('/sethun/' + n).then().catch(function (error) {
        console.log(error)
    })
}

function setEngGame() {
    fetch('/setengboth').then().catch(function (error) {
        console.log(error)
    })
}

function setEng(n) {
    fetch('/seteng/' + n).then().catch(function (error) {
        console.log(error)
    })
}

function switchLang(n) {
    fetch('/switchlang/' + n).then().catch(function (error) {
        console.log(error)
    })
}

function loopClient() {
    if (counter % 11 == 0) {
        fetch('/getplayers').then(function (response) {
            return response.json()
        }).then(function (json) {
            var time;
            if (client == 0) {
                time = json.green.time;
                f('message').innerHTML = json.green.message;
                f('hinttext').innerHTML = json.green.hinttext;
                f('hints').innerHTML = json.green.hints;
                if (!json.separate) {
                    f('opphinttext').innerHTML = json.green.opphinttext;
                    f('opphints').innerHTML = json.red.hints;
                } else {
                    f('opphinttext').innerHTML = '';
                    f('opphints').innerHTML = '';
                }
            } else {
                time = json.red.time;
                f('message').innerHTML = json.red.message;
                f('hinttext').innerHTML = json.red.hinttext;
                f('hints').innerHTML = json.red.hints;
                if (!json.separate) {
                    f('opphinttext').innerHTML = json.red.opphinttext;
                    f('opphints').innerHTML = json.green.hints;
                } else {
                    f('opphinttext').innerHTML = '';
                    f('opphints').innerHTML = '';
                }
            }

            f('d5').innerHTML = time.substr(0, 1);
            f('d4').innerHTML = time.substr(1, 1);
            f('c1').innerHTML = time.substr(2, 1);
            f('d3').innerHTML = time.substr(3, 1);
            f('d2').innerHTML = time.substr(4, 1);
            f('c0').innerHTML = time.substr(5, 1);
            f('d1').innerHTML = time.substr(6, 1);
            f('d0').innerHTML = time.substr(7, 1);
        }).catch(function (error) {
            f('message').innerHTML = 'Connection lost';
        })
    }
    counter++;
    window.requestAnimationFrame(loopClient);
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
