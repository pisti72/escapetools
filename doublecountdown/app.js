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
const PLAYING = 3
const NOTFINISHED = 4
const WEWON = 6
const WELOSE = 7
const OUTOFTIME = 8

const MAXHINTS = 3
const MAXTOP = 12
const ONEHOUR = 60 * 60 * 1000
const FIVEMINUTES = 5 * 60 * 1000
const ONEMINUTE = 60 * 1000

texts.hu.versionnr = texts.en.versionnr = package.version

function Player() {
    this.time = 0
    this.status = ONSTART
    this.isPlaying = false
    this.isWinner = NOTFINISHED
    this.hint = 0
    this.startedAt = 0
    this.pausedAt = 0
    this.targetTime = 0
    this.lang = 'hu'
    this.text
    this.inicGame = function () {
        if (this.isWinner != NOTFINISHED) {
            this.hint = 0
            this.status = ONSTART
            this.isWinner = NOTFINISHED
        }
    }
    this.setText = function (text) {
        this.text = text
    }
    this.switchLang = function () {
        if (this.lang == 'hu') {
            this.lang = 'en'
            this.text = texts.en
        } else {
            this.lang = 'hu'
            this.text = texts.hu
        }
    }
    this.startGame = function () {
        if (this.status == ONSTART) {
            let d = new Date()
            this.status = PLAYING
            this.startedAt = d.getTime()
            this.targetTime = this.startedAt + ONEHOUR
        }
    }
    this.pauseGame = function () {
        let d = new Date()
        if (this.status == PLAYING) {
            this.status = PAUSED
            this.pausedAt = this.targetTime - d.getTime()
        } else if (this.status == PAUSED) {
            this.status = PLAYING
            this.targetTime = d.getTime() + this.pausedAt
        }
    }
    this.wonGame = function () {
        let d = new Date()
        if (this.status == PLAYING || this.status == PAUSED && this.isWinner != WEWON) {
            this.isWinner = WEWON
            this.status = PAUSED
            this.pausedAt = this.targetTime - d.getTime()
        }
    }
    this.loseGame = function () {
        let d = new Date()
        if (this.status == PLAYING || this.status == PAUSED) {
            this.isWinner = WELOSE
            this.status = PLAYING
            //this.pausedAt = this.targetTime - d.getTime()
        }
    }
    this.incHint = function () {
        if (this.status == PLAYING || this.status == PAUSED) {
            this.hint++
        }
    }
    this.decHint = function () {
        if (this.status == PLAYING || this.status == PAUSED) {
            this.hint--
            if (this.hint < 0) {
                this.hint = 0
            }
        }
    }
    this.addMin = function (n) {
        if (this.status == PLAYING) {
            this.targetTime += n * ONEMINUTE
        } else if (this.status == PAUSED) {
            this.pausedAt += n * ONEMINUTE
        }
    }
    this.getData = function () {
        var d = new Date()
        var isEvenSecond = Math.floor(d.getTime() / 1000) % 2 == 0
        let message = ''

        if (this.status == ONSTART) {
            this.time = 0
            message = this.text.startsoon
        } else if (this.status == PLAYING) {
            this.time = this.targetTime - d.getTime()
        } else if (this.status == PAUSED) {
            this.time = this.pausedAt
            message = this.text.paused
        } else {
            message = this.text.error
        }

        if (this.isWinner == WEWON) {
            //this.time = this.pausedAt
            message = this.text.wewon
        } else if (this.isWinner == WELOSE) {
            //this.time = this.targetTime - d.getTime()
            message = this.text.welose
        } else if (this.isWinner == OUTOFTIME) {
            //this.time = 0
            message = this.text.outoftime
        }
        //blinking message
        if (isEvenSecond) {
            this.message = message
        } else {
            this.message = ''
        }
        if (this.time < 0) {
            this.time = 0
            this.isWinner = OUTOFTIME
        }
        timeR = this.getReadable(this.time)
        return {
            message: this.message,
            time: timeR,
            hinttext: this.text.myhints,
            opphinttext: this.text.opponenthints,
            hints: this.hint,
        }
    }
    this.getReadable = function (time) {
        var t = new Date(time)
        return this.two(t.getMinutes()) + ':' + this.two(t.getSeconds()) + ':' + this.two(t.getMilliseconds())
    }
    this.two = function (n) {
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
}

var isSeparate = false;

var players = [new Player(), new Player()]
players[0].setText(texts.hu)
players[1].setText(texts.hu)


app.set('view engine', 'pug')
app.use(express.static('public'))

app.get('/', (req, res) => {
    res.render('index', texts.hu)
})

app.get('/player/*', (req, res) => {
    res.render('player')
})

app.get('/getmyip', (req, res) => {
    var result = { ip: ip.address(), port: PORT }
    res.send(JSON.stringify(result))
})

app.get('/inchint/:player', (req, res) => {
    let p = req.params.player
    players[p].incHint()
    res.send('hint increased : ' + p)
})

app.get('/dechint/:player', (req, res) => {
    let p = req.params.player
    players[p].decHint()
    res.send('hint decreased : ' + p)
})

app.get('/getplayers', (ree, res) => {
    res.send(
        JSON.stringify(
            {
                green: players[0].getData(),
                red: players[1].getData(),
                separate: isSeparate
            }
        )
    )
})

app.get('/inic/:player', (req, res) => {
    let p = req.params.player
    isSeparate = true;
    players[p].inicGame()
    res.send('inicialized : ' + p)
})

app.get('/inicboth', (req, res) => {
    isSeparate = false;
    players[0].inicGame()
    players[1].inicGame()
    res.send('inicialized both')
})

app.get('/start/:player', (req, res) => {
    isSeparate = true;
    let p = req.params.player
    players[p].startGame()
    res.send('started : ' + p)
})

app.get('/startboth', (req, res) => {
    isSeparate = false;
    players[0].startGame()
    players[1].startGame()
    res.send('started both')
})

app.get('/pause/:player', (req, res) => {
    let p = req.params.player
    players[p].pauseGame()
    res.send('paused : ' + p)
})

app.get('/pauseboth', (req, res) => {
    players[0].pauseGame()
    players[1].pauseGame()
    res.send('paused both')
})

app.get('/incminboth', (req, res) => {
    players[0].addMin(1)
    players[1].addMin(1)
    res.send('minutes increased')
})

app.get('/decminboth', (req, res) => {
    players[0].addMin(-1)
    players[1].addMin(-1)
    res.send('minutes decreased')
})

app.get('/incmin/:player', (req, res) => {
    let p = req.params.player
    players[p].addMin(1)
    res.send('minutes increased : ' + p)
})

app.get('/decmin/:player', (req, res) => {
    let p = req.params.player
    players[p].addMin(-1)
    res.send('minutes decreased : ' + p)
})

app.get('/won/:player', (req, res) => {
    let p = req.params.player
    if (p == 0) {
        players[0].wonGame()
        if (!isSeparate) {
            players[1].loseGame()
        }
    } else {
        players[1].wonGame()
        if (!isSeparate) {
            players[0].loseGame()
        }
    }
    res.send('finished')
})

app.get('/sethunboth', (req, res) => {
    players[0].setText(texts.hu)
    players[1].setText(texts.hu)
    res.send('magyar')
})

app.get('/sethun/:player', (req, res) => {
    let p = req.params.player
    players[p].setText(texts.hu)
    res.send('magyar : ' + p)
})

app.get('/setengboth', (req, res) => {
    players[0].setText(texts.en)
    players[1].setText(texts.en)
    res.send('angol')
})

app.get('/seteng/:player', (req, res) => {
    let p = req.params.player
    players[p].setText(texts.en)
    res.send('angol : ' + p)
})

app.get('/switchlang/:player', (req, res) => {
    let p = req.params.player
    players[p].switchLang()
    res.send('lang switched : ' + p)
})
app.listen(PORT, () => console.log(package.name + ' server listening on port ' + PORT + '!'))


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





