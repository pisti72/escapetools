const STATE_HALT = 0;
const api = './api.php';
const tick = 30;
var state = STATE_HALT;
var endTime = 0;
var counter = 0;
var timeString = '';
var date = {};
var color = 'R';
var paused = false;
var pausedAt = 0;
//setEndTime(60 * 60 + 1);
update();

function checkServer() {
    if (counter % tick == 0) {
        fetch(api + '?timer=' + id).then(function (response) {
            return response.json()
        }).then(function (json) {
            if (json.command == 'SETONEHOUR') {
                setOneHour();
            } else if (json.command == 'DECFIVEMINS') {
                decFiveMins();
            } else if (json.command == 'ADDFIVEMINS') {
                addFiveMins();
            } else if (json.command == 'SETTOZERO') {
                setToZero();
            } else if (json.command == 'RED') {
                setColor('#f00');
                color = 'R';
            } else if (json.command == 'GREEN') {
                setColor('#0f0');
                color = 'G';
            } else if (json.command == 'WHITE') {
                setColor('#fff');
                color = 'W';
            } else if (json.command == 'BLUE') {
                setColor('#00f');
                color = 'B';
            } else if (json.command == 'PAUSED') {
                paused = true;
                date = new Date();
                pausedAt = endTime - date.getTime();
            } else if (json.command == 'CONTINUE') {
                paused = false;
            }
            //send back the timeString
            fetch(api + '?timestring=' + timeString
                + '&receivedcommand=' + json.command
                + '&color=' + color
                + '&token=' + id).then(function (response) {
                    return response.json()
                })
                .then(function (json) {
                    if (json.result == 'success') {
                        hide('connection');
                    } else {
                        visible('connection');
                    }
                })
                .catch(function (error) {
                    //console.log(error)
                    visible('connection');
                })
        }).catch(function (error) {
            //console.log(error);
            visible('connection');
        })
    }
}

function setOneMinutes() {
    setEndTime(60);
}

function setOneHour() {
    setEndTime(60 * 60);
}

function setToZero() {
    setEndTime(0);
}

function setColor(n) {
    f('time').style.color = n;
    f('time').style.textShadow = '0px 0px 20px ' + n;
}

function decFiveMins() {
    addMinutesToEndTime(-5);
}

function addFiveMins() {
    addMinutesToEndTime(5);
}

function setEndTime(n) {
    date = new Date();
    endTime = date.getTime() + 1000 * n;
}

function addSecondsToEndTime(n) {
    endTime += 1000 * n;
}

function addMinutesToEndTime(n) {
    endTime += 60000 * n;
}

function getMinutesTen(t) {
    return Math.floor(t / 600000) % 6 + '';
}

function getMinutesOne(t) {
    return Math.floor(t / 60000) % 10 + '';
}

function getSecondsOne(t) {
    return Math.floor(t / 1000) % 10 + '';
}

function getSecondsTen(t) {
    return Math.floor(t / 10000) % 6 + '';
}

function getSeconds(t) {
    return Math.floor(t / 1000) % 100 + '';
}

function getMillisecondsTen(t) {
    return Math.floor(t / 100) % 10 + '';
}

function getMillisecondsOne(t) {
    return Math.floor(t / 10) % 10 + '';
}

function update() {
    counter++;
    date = new Date();
    if(paused){
        endTime = pausedAt + date.getTime();
    }
    var time = endTime - date.getTime();
    if (time < 0) {
        time = 0;
    }
    checkServer();
    timeString = getSixDigits(time);
    f('time').innerHTML = timeString;
    requestAnimationFrame(update);
}

function getSixDigits(time) {
    return getMinutesTen(time) +
        getMinutesOne(time) +
        ':' +
        getSecondsTen(time) +
        getSecondsOne(time) +
        ':' +
        getMillisecondsTen(time) +
        getMillisecondsOne(time);
}

function visible(n) {
    f(n).style.display = 'block';
}

function hide(n) {
    f(n).style.display = 'none';
}

function f(n) {
    return document.getElementById(n);
}