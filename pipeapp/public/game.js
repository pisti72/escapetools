const ONSTART = 0
const INGAME = 4;
const GAMEOVER = 5;
const GAMEFINISHED = 6;
const EMPTY = '';
const FULLSCREENON = 'n';
const FULLSCREENOFF = 'o';
const BASEURL = 'http://localhost:3000';
const SPACE = 'SPACE';
const END = 'END';
const DEL = 'DEL';
const ERROR = 'Server connection ERROR!';
const MAXLENGTH = 12;

var fullscreen = false;
var counter = 0;
var name = EMPTY;
var time = EMPTY;
var ms = 0;

function initGame() {
    document.body.style.cursor = 'none';

    f('onstart').style.display = 'block';
    f('ingame').style.display = 'none';
    f('inputname').style.display = 'none';
    renderKeyboard();
    document.body.addEventListener('keydown', function (e) {
        if (e.keyCode == 13) {
            toggleFullScreen();
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
        if (name.length != 0) {
            name = name.substring(0, name.length - 1);
        }
    } else if (i == SPACE) {
        name += ' ';
    } else if (i == END) {
        endPressed();
    } else {
        name += i;
    }
    if (name.length > MAXLENGTH) {
        name = name.substring(0, MAXLENGTH);
    }
    f('inputbox').innerHTML = name;
}

function endPressed() {
    fetch('/ms/' + ms + '/name/' + name).then(function (response) {
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
            if (json.status == ONSTART) {
                f('onstart').style.display = 'block';
                f('ingame').style.display = 'none';
                f('inputname').style.display = 'none';

                if ([1, 4, 6, 7, 8, 9, 10, 12, 15].includes(counter % 20)) {
                    f('title').style.visibility = 'visible';
                } else {
                    f('title').style.visibility = 'hidden';
                }

                if (counter % 30 > 15) {
                    f('titleinfo').innerHTML = 'Grab the ring to play';
                } else {
                    f('titleinfo').innerHTML = '(C)2018 Mystiqueroom';
                }
            } else if (json.status == INGAME || json.status == GAMEOVER) {
                f('inputbox').innerHTML = 'Enter your name';
                name = EMPTY

                f('onstart').style.display = 'none';
                f('ingame').style.display = 'block';
                f('inputname').style.display = 'none';
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
                ms = json.ms;
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
function fetchingHighscore() {
    fetch('/gethighscore').then(function (response) {
        return response.json();
        throw new TypeError("Oops, we haven't got JSON!");
    })
        .then(function (json) {
            let s = '<table align="center">';
            for (let i = 0; i < json.length; i++) {
                s += '<tr>';
                s += '<td>' + (i + 1) + '.</td>';
                s += '<td>' + json[i].timeHuman + '</td>';
                s += '<td>' + json[i].name + '</td>';
                s += '<td>' + json[i].timestamp + '</td>';
                s += '</tr>';
            }
            s += '</table>';
            f('list').innerHTML = s;
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
function f(i) {
    return document.getElementById(i);
}