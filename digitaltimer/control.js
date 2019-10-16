const api = './api.php';
const tick = 30;
var counter = 0;
var color = 'R';
var play = true;
writePause();
update();

function checkServer() {
    if (counter % tick == 0) {
        fetch(api + '?timer=' + id).then(function (response) {
            return response.json()
        }).then(function (json) {
            f('name').innerHTML = json.name;
            f('timestring').innerHTML = json.timestring;
            color = json.color;
            if (color == 'R') {
                setColor('#f00');
            } else if (color == 'G') {
                setColor('#0f0');
            } else if (color == 'B') {
                setColor('#00f');
            } else if (color == 'W') {
                setColor('#fff');
            }
            if(json.result == 'success'){
                hide('connection');
            }else{
                visible('connection');
            }
            
            //console.log(json.command);
            if(json.command != 'NOPE'){
                visible('message');
                f('message').innerHTML = 'Sending command...';
                if(json.command == 'SETONEHOUR'){
                    f('message').innerHTML = 'Setting one hour..';
                }else if(json.command == 'DECFIVEMINS'){
                    f('message').innerHTML = 'Decreasing 5 mins...';
                }else if(json.command == 'ADDFIVEMINS'){
                    f('message').innerHTML = 'Adding 5 mins...';
                }else if(json.command == 'SETTOZERO'){
                    f('message').innerHTML = 'Stopping...';
                }else if(json.command == 'RED'){
                    f('message').innerHTML = 'Changing to red...';
                }else if(json.command == 'GREEN'){
                    f('message').innerHTML = 'Changing to green...';
                }else if(json.command == 'BLUE'){
                    f('message').innerHTML = 'Changing to blue...';
                }else if(json.command == 'WHITE'){
                    f('message').innerHTML = 'Changing to white...';
                }else if(json.command == 'PAUSED'){
                    f('message').innerHTML = 'Pausing...';
                }else if(json.command == 'CONTINUE'){
                    f('message').innerHTML = 'Playing...';
                }
            }else{
                hide('message');
            }
        }).catch(function (error) {
            console.log(error);
            visible('connection');
        })
    }
}

function setOneHour() {
    fetch(api + '?command=SETONEHOUR&token=' + id).then().catch(function (error) {
        console.log(error)
    })
}

function decFiveMins() {
    fetch(api + '?command=DECFIVEMINS&token=' + id).then().catch(function (error) {
        console.log(error)
    })
}

function addFiveMins() {
    fetch(api + '?command=ADDFIVEMINS&token=' + id).then().catch(function (error) {
        console.log(error)
    })
}

function setToZero() {
    fetch(api + '?command=SETTOZERO&token=' + id).then().catch(function (error) {
        console.log(error)
    })
}

function setColor(n) {
    f('timestring').style.color = n;
    f('timestring').style.textShadow = '0px 0px 20px ' + n;
}

function setToRed() {
    fetch(api + '?command=RED&token=' + id).then().catch(function (error) {
        console.log(error)
    })
}

function setToGreen() {
    fetch(api + '?command=GREEN&token=' + id).then().catch(function (error) {
        console.log(error)
    });
}

function setToBlue() {
    fetch(api + '?command=BLUE&token=' + id).then().catch(function (error) {
        console.log(error)
    });
}

function setToWhite() {
    fetch(api + '?command=WHITE&token=' + id).then().catch(function (error) {
        console.log(error)
    });
}

function playPressed() {
    if(play){
        play = false;
        writePlay();
        fetch(api + '?command=PAUSED&token=' + id).then().catch(function (error) {
            console.log(error)
        })
    }else{
        play = true;
        writePause()
        fetch(api + '?command=CONTINUE&token=' + id).then().catch(function (error) {
            console.log(error)
        })
    }
}

function writePlay(){
    f('play').innerHTML = '&#9654;&nbsp;Play';
}

function writePause(){
    f('play').innerHTML = '&#9475;&#9475;Pause';
}

function update() {
    counter++;
    checkServer();
    requestAnimationFrame(update);
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