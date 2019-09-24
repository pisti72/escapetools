const api = '/api.php';
var counter = 0;
update();

function checkServer() {
    if (counter % 30 == 0) {
        fetch(api + '?timer=' + id).then(function (response) {
            return response.json()
        }).then(function (json) {
            f('name').innerHTML = json.name;
            f('timestring').innerHTML = json.timestring;
            f('timestring').style.color = json.color;
            //console.log(json.command);
        }).catch(function (error) {
            console.log(error);
        })
    }
}

function setOneHour() {
    fetch(api + '?command=SETONEHOUR&token=' + id).then().catch(function (error) {
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

function setToRed() {
    fetch(api + '?command=RED&token=' + id).then().catch(function (error) {
        console.log(error)
    })
    fetch(api + '?color=red&token=' + id).then().catch(function (error) {
        console.log(error)
    })
}

function setToGreen() {
    fetch(api + '?command=GREEN&token=' + id).then().catch(function (error) {
        console.log(error)
    });
    fetch(api + '?color=green&token=' + id).then().catch(function (error) {
        console.log(error)
    })
}

function setToBlue() {
    fetch(api + '?command=BLUE&token=' + id).then().catch(function (error) {
        console.log(error)
    });
    fetch(api + '?color=blue&token=' + id).then().catch(function (error) {
        console.log(error)
    })
}

function setToWhite() {
    fetch(api + '?command=WHITE&token=' + id).then().catch(function (error) {
        console.log(error)
    });
    fetch(api + '?color=white&token=' + id).then().catch(function (error) {
        console.log(error)
    })
}

function update() {
    counter++;
    checkServer();
    requestAnimationFrame(update);
}

function f(n) {
    return document.getElementById(n);
}