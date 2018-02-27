/**
 * My app
 *
 */
const package = require('./package.json')
var texts = require('./translations.json')
const express = require('express')
var ip = require("ip")
const app = express()
const PORT = 3000;

const ONSTART = 0
const PAUSED = 1
const ONSTOP = 2
const PLAYING = 4
const FINISHED1 = 5
const FINISHED2 = 6
const MAXHINTS = 3
const MAXTOP = 12
const ONEHOUR = 60 * 60 * 1000
const FIVEMINUTES = 5 * 60 * 1000
const ONEMINUTES = 60 * 1000

texts.version = package.version

var status = ONSTART
var startedAt = 0
var targetTime = 0
var text = texts.hu

var hint = [0, 0]


app.set('view engine', 'pug')
app.use(express.static('public'))

app.get('/', (req, res) => {
    res.render('index', texts)
})

app.get('/player', (req, res) => {
    res.render('player', texts)
})

app.get('/getmyip', (req, res) => {
    var result = { ip: ip.address(), port: PORT }
    res.send(JSON.stringify(result))
})

app.get('/givehint/:player', (req, res) => {
    if (status == PLAYING) {
        let p = req.params.player
        hint[p]++
    }
    res.send(JSON.stringify({ result: 'success' }))
})

app.get('/inic', (req, res) => {
    status = ONSTART
    hint = [0, 0]
    res.send('inicialized')
})

app.get('/start', (req, res) => {
    if (status == ONSTART) {
        var d = new Date()
        status = PLAYING
        startedAt = d.getTime()
        targetTime = startedAt + ONEHOUR
        res.send('started')
    } else {
        res.send('inicilize first')
    }
})

app.get('/pause', (req, res) => {
    var d = new Date()
    if (status == PLAYING) {
        status = PAUSED
        pausedAt = targetTime - d.getTime()
    } else if (status == PAUSED) {
        status = PLAYING
        targetTime = d.getTime() + pausedAt
    }

    res.send('paused')
})

app.get('/inconemin', (req, res) => {
    targetTime += ONEMINUTE
    res.send('increased')
})

app.get('/deconemin', (req, res) => {
    targetTime -= ONEMINUTE
    res.send('increased')
})

app.get('/stop/:player', (req, res) => {
    if (status == PLAYING) {
        var d = new Date()
        var player = req.params.player
        pausedAt = targetTime - d.getTime()
        if (player == 1) {
            status = FINISHED1
        } else {
            status = FINISHED2
        }
        res.send('stopped')
    } else {
        res.send('only in playing')
    }
})

app.get('/getplayer/:p', (req, res) => {
    var d = new Date()
    var time
    var response
    var message = ''
    var timeR
    if (status == ONSTART) {
        time = 0
        timeR = getReadable(time)
        if (Math.floor(d.getTime() / 1000) % 2 == 0) {
            message = ''
        } else {
            message = text.startsoon
        }
    } else if (status == PLAYING) {
        //time = d.getTime() - startedAt
        time = targetTime - d.getTime()
    } else if (status == PAUSED || status == FINISHED1 || status == FINISHED2) {
        time = pausedAt
    }

   

    if (req.params.p == 1) {
        response = {
            message: message,
            time: timeR,
            hinttext: text.myhints,
            opphinttext: text.opponenthints,
            hints: hint[0],
            opphints: hint[1]
        }
    } else if (req.params.p == 2) {
        response = {
            message: message,
            time: timeR,
            hinttext: text.myhints,
            opphinttext: text.opponenthints,
            hints: hint[1],
            opphints: hint[0]
        }
    }

    res.send(JSON.stringify(response))
})

app.get('/setlang/:lang', (req, res) => {
    if (req.params.lang == 'hu') {
        text = texts.hu
        res.send('magyar')
    } else if (req.params.lang == 'en') {
        text = texts.en
        res.send('english')
    }else{
        res.send('no success')
    }
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
    status = PLAYING
    hint = [0, 0]
    startedAt = d.getTime()
    targetTime = startedAt + ONEHOUR
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


