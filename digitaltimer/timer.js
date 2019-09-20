const STATE_HALT = 0;
var state = STATE_HALT;
var endTime = 0;
var counter = 0;
var date = {};
setEndTime(60*60+1);
update();
function pauseGame(n) {
    fetch('/pauseboth').then().catch(function (error) {
        console.log(error)
    })
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
function checkServer(){
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
}
function setOneMinutes() {
    setEndTime(60);
}
function setOneHour() {
    setEndTime(60 * 60);
}
function setEndTime(n) {
    date = new Date();
    endTime = date.getTime() + 1000 * n;
}
function addSecondsToEndTime(n){
    endTime += 1000 * n;
}
function addMinutesToEndTime(n){
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
function getMillisecondsTen(t){
    return Math.floor(t / 100) % 10 + '';
}
function getMillisecondsOne(t){
    return Math.floor(t / 10) % 10 + '';
}
function update() {
    counter++;
    date = new Date();
    var time = endTime - date.getTime();
    if (time < 0) {
        time = 0;
    }
    f('time').innerHTML = 
    getMinutesTen(time) +
    getMinutesOne(time) +
    ' : ' +
    getSecondsTen(time) +
    getSecondsOne(time) + 
    ' : ' + 
    getMillisecondsTen(time) +
    getMillisecondsOne(time);
    requestAnimationFrame(update);
}
function f(n) {
    return document.getElementById(n);
}