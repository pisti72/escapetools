const api = '/api.php';
var counter = 0;
update();

function checkServer() {
    if (counter % 100 == 0) {
        fetch(api + '?timer=' + id).then(function (response) {
            return response.json()
        }).then(function (json) {
            f('name').innerHTML = json.name;
            f('timestring').innerHTML = json.timestring;
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

function update() {
    counter++;
    checkServer();
    requestAnimationFrame(update);
}

function f(n) {
    return document.getElementById(n);
}