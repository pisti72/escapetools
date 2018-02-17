/**
 * My app
 *
 */

const express = require('express')
var ip = require("ip")
const app = express()
const PORT = 3000;
const ONSTART = 0
const ONSTOP = 2
const INAIR = 3
const INGAME = 4
const GAMEOVER = 5
const GAMEFINISHED = 6
const MAXHINTS = 3
const MAXTOP = 12

var gameStatus = ONSTART
var hints = 0

app.set('view engine', 'pug')
app.use(express.static('public'))

app.get('/', (req, res) => {
    res.render('index', { title: 'Hey', message: 'Hello there' })
})

app.get('/getmyip', (req, res) => {
    var result = { ip: ip.address(), port: PORT }
    res.send(JSON.stringify(result))
})

app.get('/start', (req, res) => {
    gameStarted()
    var response = 'Started at: ' + startedAt
    console.log(response)
    res.send(response)
})

app.get('/stop', (req, res) => {
    var d = new Date()
    var time = d.getTime() - startedAt
    var response = 'Your time: ' + time + '  in readable: ' + getReadable(time)
    res.send(response)
})

app.get('/getgamedata', (req, res) => {
    var d = new Date()
    var time;
    if (gameStatus == ONSTART) {
        time = 0
    } else if (gameStatus == INGAME) {
        time = d.getTime() - startedAt
    } else if (gameStatus == GAMEOVER || gameStatus == GAMEFINISHED) {
        time = stoppedAt - startedAt
    }
    //TEST
    //time = 999999;
    //gameStatus = GAMEFINISHED;
    var response = { time: getReadable(time), ms: time, hints: hints, status: gameStatus }
    res.send(JSON.stringify(response))
})

app.listen(PORT, () => console.log('Server listening on port ' + PORT + '!'))


/**
 * 
 * HELPER FUNCTIONS
 * 
 */


function getHHHHMMDDfromTimestamp(date) {
    var d = new Date(date)
    var dd = d.getDate();
    var mm = d.getMonth() + 1;
    var yyyy = d.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    return yyyy + '/' + mm + '/' + dd;
}

function gameStarted() {
    var d = new Date()
    gameStatus = INGAME
    hints = 0
    startedAt = d.getTime()
}

function getReadable(time) {
    var t = new Date(time)
    return two(t.getMinutes()) + ':' + two(t.getSeconds()) + ':' + two(t.getMilliseconds())
}

function two(n) {
    var s = n + ''
    if (s.length == 1) {
        return '0' + s
    }
    if (s.length == 2) {
        return s
    }
    if (s.length > 2) {
        return s.substr(0, 2)
    }
}


