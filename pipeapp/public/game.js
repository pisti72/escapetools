const ONSTART = 0
const INGAME = 4;
const GAMEOVER = 5;
const GAMEFINISHED = 6;
const EMPTY = '';
const FULLSCREENON = 'n';
const FULLSCREENOFF = 'o';
const SPACE = 'SPACE';
const END = 'END';
const DEL = 'DEL';
const ERROR = 'No connection!';
const MAXLENGTH = 16;

var fullscreen = true;
var counter = 0;
var name = EMPTY;
var time = EMPTY;
var ms = 0;
var lives = 0;
var lastClick = 0;
var sequence = '';

//audio components
var sndStart;
var sndFail;
var sndGameover;
var sndSuccess;
var sndBtn;
var sndDel;
var sndEnd;

function initGame() {
    document.body.style.cursor = 'none';

    sndStart = f('sndStart');
    sndFail = f('sndFail');
    sndGameover = f('sndGameover');
    sndSuccess = f('sndSuccess');
    sndBtn = f('sndBtn');
    sndDel = f('sndDel');
    sndEnd = f('sndEnd');

    sndStart.play();

    f('onstart').style.display = 'block';
    f('ingame').style.display = 'none';
    f('inputname').style.display = 'none';
    renderKeyboard();
    fetchHighscore();
    // document.body.addEventListener("touchstart", function (e) {
    //     e.preventDefault();
    // })
    document.body.addEventListener('keydown', function (e) {
        if (e.keyCode == 13) {//Enter
            toggleFullScreen();
        }
        if (e.keyCode == 75) {//K-key
            titleClicked();
        }
    });
    setInterval(fetchingGamedata, 71);
}

function initHighscore() {
    document.body.addEventListener('keydown', function (e) {
        if (e.keyCode == 13) {
            toggleFullScreen();
        }
    });
    setInterval(fetchingHighscore, 1000);
}

function renderKeyboard() {
    var layout = [['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'END'],
    ['Z', 'X', 'C', 'V', 'SPACE', 'B', 'N', 'M', 'DEL']
    ];
    var s = EMPTY;
    for (var i = 0; i < layout.length; i++) {
        var row = layout[i];
        s += '<tr>';
        for (var j = 0; j < row.length; j++) {
            var k = row[j];
            var colspan = EMPTY;
            if (k == 'SPACE') {
                colspan = 'colspan="2"';
            }
            s += '<td class="btn" id="btn' + k + '" onclick="btnPressed(\'' + k + '\')" ' + colspan + '>' + k + '</td>';
        }
        s += '</tr>';
    }
    f('keyboard').innerHTML = s;
}

function btnPressed(i) {
    if (i == DEL) {
        sndDel.play();
        if (name.length != 0) {
            name = name.substring(0, name.length - 1);
        }
    } else if (i == SPACE) {
        sndBtn.play();
        name += ' ';
    } else if (i == END) {
        sndEnd.play();
        counter = 50;
        endPressed();
        fetchHighscore();
    } else {
        sndBtn.play();
        name += i;
    }
    if (name.length > MAXLENGTH) {
        name = name.substring(0, MAXLENGTH);
    }
    f('inputbox').innerHTML = name;
}

function endPressed() {
    fetch('/ms/' + ms + '/name/' + name + '/lives/' + lives).then(function (response) {
        return response.json();
        throw new TypeError("Oops, we haven't got JSON!");
    })
        .catch(function (error) { console.log(error); });
}

function fetchingGamedata() {
    fetch('/getgamedata').then(function (response) {
        return response.json();
        throw new TypeError("Oops, we haven't got JSON!");
    })
        .then(function (json) {
            if (json.sound == 'started') {
                sndStart.play()
            } else if (json.sound == 'failed') {
                sndFail.play()
            } else if (json.sound == 'gameover') {
                sndGameover.play()
            } else if (json.sound == 'success') {
                sndSuccess.play()
            }
            if (json.status == ONSTART) {

                f('ingame').style.display = 'none';
                f('inputname').style.display = 'none';
                if (counter % 200 < 100) {
                    f('onstart').style.display = 'block';
                    f('topscore').style.display = 'none';
                    //if ([1, 4, 6, 7, 8, 9, 10, 12, 15].includes(counter % 20)) {
                    if (counter % 10 < 8) {
                        f('titleimg').style.visibility = 'visible';
                    } else {
                        f('titleimg').style.visibility = 'hidden';
                    }

                    var c = counter % 60;

                    if (c < 20) {
                        f('titleinfo').innerHTML = 'Grab the ring to play';
                    } else if (c >= 20 && c < 40) {
                        f('titleinfo').innerHTML = '(C)2018 Mystiqueroom';
                    } else {
                        f('titleinfo').innerHTML = 'Inditashoz vedd le a gyurut';
                    }
                } else {
                    f('onstart').style.display = 'none';
                    f('topscore').style.display = 'block';
                    //Blinking title
                    if (counter % 10 < 5) {
                        f('topscore_title').style.visibility = 'visible';
                    } else {
                        f('topscore_title').style.visibility = 'hidden';
                    }
                    //Paging scores
                    if (counter % 100 < 50) {
                        f('list1').style.display = 'block';
                        f('list2').style.display = 'none';
                    } else {
                        f('list1').style.display = 'none';
                        f('list2').style.display = 'block';
                    }
                }
            } else if (json.status == INGAME || json.status == GAMEOVER) {
                f('inputbox').innerHTML = 'Enter your name';
                name = EMPTY
                f('onstart').style.display = 'none';
                f('ingame').style.display = 'block';
                f('inputname').style.display = 'none';
                f('topscore').style.display = 'none';

                let s = '<table align="center" width="50%"><tr>';
                for (let i = 0; i < json.lives; i++) {
                    s += '<td><img src="assets/heart_dot_red.svg" height="120px"/></td>';
                }
                for (let i = 0; i < json.maxlives - json.lives; i++) {
                    s += '<td><img src="assets/heart_dot_dark.svg" height="120px"/></td>';
                }
                s += '</tr></table>';

                f('heart').innerHTML = s;
                f('mmh').innerHTML = json.time.substr(0, 1);
                f('mml').innerHTML = json.time.substr(1, 1);
                f('ssh').innerHTML = json.time.substr(3, 1);
                f('ssl').innerHTML = json.time.substr(4, 1);
                f('msh').innerHTML = json.time.substr(6, 1);
                f('msl').innerHTML = json.time.substr(7, 1);

                if (json.status == GAMEOVER && counter % 6 > 2) {
                    f('gameinfo').innerHTML = 'Game Over';
                } else if (json.status == ONSTART && counter % 8 > 3) {
                    f('gameinfo').innerHTML = 'Pipe Game';
                } else if (json.status == INGAME && counter % 16 > 6) {
                    f('gameinfo').innerHTML = 'Do not touch the pipe!';
                } else {
                    f('gameinfo').innerHTML = EMPTY;
                }
            } else if (json.status == GAMEFINISHED) {
                f('ingame').style.display = 'none';
                f('onstart').style.display = 'none';
                f('inputname').style.display = 'block';
                f('topscore').style.display = 'none';
                ms = json.ms;
                lives = json.lives;
                time = json.time;
                f('time').innerHTML = time;
            }
            counter++;
        })
        .catch(function (error) {
            f('gameinfo').innerHTML = ERROR;
            f('titleinfo').innerHTML = ERROR;
            f('inputname').innerHTML = ERROR;
        });
}

function titleClicked() {
    var t = new Date().getTime();
    var d = getTiTaOrNone(t - lastClick);
    lastClick = t;
    if (d == 'None') {
        sequence = '';
    } else {
        sequence += d;
        if (sequence == 'TiTiTaTa') {
            f('settings').style.display = 'block';
            getIp();
        }
    }
}

function deleteTodayHi() {
    fetch('/deletehi').then(function (response) {
        return response.json();
        throw new TypeError("Oops, we haven't got JSON!");
    }).catch(function (error) { console.log(error); });
}

function setLivesTo(n) {

}

function closeSettings() {
    f('settings').style.display = 'none';
}

function getTiTaOrNone(n) {
    if (n < 600) {
        return 'Ti';
    } else if (n < 1100) {
        return 'Ta';
    }
    return 'None';
}

function fetchingHighscore() {
    fetch('/gethighscore/0/13').then(function (response) {
        return response.json();
        throw new TypeError("Oops, we haven't got JSON!");
    })
        .then(function (json) {
            let s = '<table align="center">';
            for (let i = 0; i < json.length; i++) {
                s += '<tr>';
                s += '<td width="10%" class="row">' + json[i].id + '.</td>';
                s += '<td width="20%" class="row">' + json[i].timeHuman + '</td>';
                s += '<td width="50%" class="row">' + json[i].name + '</td>';
                s += '<td width="20%" class="row">' + json[i].timestamp + '</td>';
                s += '</tr>';
            }
            s += '</table>';
            f('list').innerHTML = s;
        })
        .catch(function (error) {
            f('list').innerHTML = ERROR;
        });
}

function fetchHighscore() {
    fetch('/gethighscore/0/12').then(function (response) {
        return response.json();
        throw new TypeError("Oops, we haven't got JSON!");
    })
        .then(function (json) {
            //First page
            let s = '<table align="center">';
            for (let i = 0; i < 6; i++) {
                s += '<tr>';
                s += '<td width="10%" class="cell">' + json[i].id + '.</td>';
                s += '<td width="20%" class="cell">' + json[i].timeHuman + '</td>';
                s += '<td width="40%" class="cell">' + json[i].name + '</td>';
                //s += '<td width="20%" class="cell">' + json[i].timestamp + '</td>';
                s += '<td width="30%" class="cell">';
                for (let j = 0; j < json[i].lives; j++) {
                    s += '<img src="assets/heart_dot_red.svg" height="30px"/>';
                }
                s += '</td>';
                s += '</tr>';
            }
            s += '</table>';
            f('list1').innerHTML = s;
            //Second page
            s = '<table align="center">';
            for (let i = 6; i < json.length; i++) {
                s += '<tr>';
                s += '<td width="10%" class="cell">' + json[i].id + '.</td>';
                s += '<td width="20%" class="cell">' + json[i].timeHuman + '</td>';
                s += '<td width="50%" class="cell">' + json[i].name + '</td>';
                //s += '<td width="20%" class="cell">' + json[i].timestamp + '</td>';
                s += '<td width="30%" class="cell">';
                for (let j = 0; j < json[i].lives; j++) {
                    s += '<img src="assets/heart_dot_red.svg" height="30px"/>';
                }
                s += '</td>';
                s += '</tr>';
            }
            s += '</table>';
            f('list2').innerHTML = s;
        })
        .catch(function (error) {
            f('list').innerHTML = ERROR;
        });
}

function toggleFullScreen() {
    if (
        document.fullscreenEnabled ||
        document.webkitFullscreenEnabled ||
        document.mozFullScreenEnabled ||
        document.msFullscreenEnabled) {
        var d = document.body;
        if (!fullscreen) {
            fullscreen = true;
            f('fullscreen').style.display = 'none';
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
            f('fullscreen').style.display = 'block';
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
function setStatus(s) {
    fetch('/setRingStatus/' + s).then(function (response) {
        return response.json();
        throw new TypeError("Oops, we haven't got JSON!");
    })
        .then(function (json) {
            f('message').innerHTML = json.oldstatus + ' -> ' + json.newstatus
        })
        .catch(function (error) { console.log(error); });
}
function getIp() {
    fetch('/getip').then(function (response) {
        return response.json();
        throw new TypeError("Oops, we haven't got JSON!");
    })
        .then(function (json) {
            f('myip').innerHTML = 'http://' + json.ip + ':' + json.port;
        })
        .catch(function (error) { console.log(error); });
}
function f(i) {
    return document.getElementById(i);
}