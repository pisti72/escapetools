const STATE_HALT = 0;
const api = '/api.php';
var state = STATE_HALT;
var endTime = 0;
var counter = 0;
var timeString = '';
var date = {};
//setEndTime(60 * 60 + 1);
update();

function checkServer() {
    if (counter % 100 == 0) {
        
        fetch(api + '?timer=' + id).then(function (response) {
            return response.json()
        }).then(function (json) {
            if (json.command == 'SETONEHOUR') {
                setOneHour();
            } else if (json.command == 'ADDFIVEMINS') {
                addFiveMins();
            }
            //send back the timeString
            fetch(api + '?timestring=' + timeString + '&token=' + id).then().catch(function (error) {
                console.log(error)
            })
        }).catch(function (error) {
            console.log(error);
        })
    }
}
function setOneMinutes() {
    setEndTime(60);
}
function setOneHour() {
    setEndTime(60 * 60);
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
function f(n) {
    return document.getElementById(n);
}