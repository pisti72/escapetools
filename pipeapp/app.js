/**
 * @name Pipe_Game
 * @author Istvan Szalontai istvan.szalontai12Ggmail.com
 * @description Business logic and frondend pipe game for escape room
 * @created 2018/01/31
 * 
 * TODO
 * - paginable high score
 * - highscore visible on 7 inch monitor too
 * - results which are older then 3 montch should not be shown
 * - settings: ideas needed
 * - sound to fail, success, gameover
 * 
 * 
 * 
 * 
 */
const express = require('express')
const app = express()
const PORT = 3000
const DBFILE = 'db/hiscore.json'
const ONSTART = 0
const ONPIPE = 1
const ONSTOP = 2
const INAIR = 3
const INGAME = 4
const GAMEOVER = 5
const GAMEFINISHED = 6
const MAXLIVES = 3
const MAXTOP = 20

var path = require('path')
const fs = require('fs')
var gpio = require("gpio")
var ip = require('ip')
var db = []

var startedAt
var stoppedAt
var lives = MAXLIVES
var ringStatus = ONSTART
var gameStatus = ONSTART

var sound = 'none'

var gpio4 = gpio.export(4, {
    direction: "in",
    ready: function () {
        console.log('Init position on set GPIO4')
    }
});

var gpio5 = gpio.export(5, {
    direction: "in",
    ready: function () {
        console.log('Init position on set GPIO5')
    }
});

var gpio6 = gpio.export(6, {
    direction: "in",
    ready: function () {
        console.log('Init position on set GPIO6')
    }
});

inicDb()

gpio4.on("change", function (val) {
    // value will report either 1 or 0 (number) when the value changes
    console.log('GPIO 4 (START) : ' + val)
    if (val == 1) {
        setRingStatus(INAIR)
    } else {
        setRingStatus(ONSTART)
    }


});

gpio5.on("change", function (val) {
    // value will report either 1 or 0 (number) when the value changes
    console.log('GPIO 5 (PIPE) : ' + val)
    if (val == 1) {
        setRingStatus(INAIR)
    } else {
        setRingStatus(ONPIPE)
    }

    console.log(val)
});

gpio6.on("change", function (val) {
    // value will report either 1 or 0 (number) when the value changes
    console.log('GPIO 6 (FINISH) : ' + val)
    if (val == 1) {
        setRingStatus(INAIR)
    } else {
        setRingStatus(ONSTOP)
    }

    console.log(val)
});

app.use(express.static('public'))

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/index.html'))
})

app.get('/game', function (req, res) {
    res.sendFile(path.join(__dirname + '/pages/game.html'))
})

app.get('/hiscore', function (req, res) {
    res.sendFile(path.join(__dirname + '/pages/hiscore.html'))
})

app.get('/test', function (req, res) {
    res.sendFile(path.join(__dirname + '/pages/test.html'))
})

app.get('/settings', function (req, res) {
    res.sendFile(path.join(__dirname + '/pages/settings.html'))
})

app.get('/yourname', function (req, res) {
    res.sendFile(path.join(__dirname + '/pages/yourname.html'))
})

app.get('/ms/:ms/name/:name', function (req, res) {
    insertRow(req.params.ms, req.params.name)
    gameStatus = ONSTART
    lives = MAXLIVES
    res.send('Inserted')
})

app.get('/started', function (req, res) {
    gameStarted()
    var response = 'Started at: ' + startedAt
    console.log(response)
    res.send(response)
})

app.get('/stopped', function (req, res) {
    var d = new Date()
    var time = d.getTime() - startedAt

    var response = 'Your time: ' + time + '  in readable: ' + getReadable(time)
    console.log(response)
    res.send(response)
})

app.get('/getgamedata', function (req, res) {
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
    var response = {
        time: getReadable(time),
        ms: time,
        lives: lives,
        maxlives: MAXLIVES,
        status: gameStatus,
        sound: sound
    }
    sound = 'none'
    res.send(JSON.stringify(response))
})

app.get('/setringstatus/:status', function (req, res) {
    var response = { oldstatus: getTextByRingStatus(ringStatus), newstatus: null }
    setRingStatus(req.params.status)
    response.newstatus = getTextByRingStatus(ringStatus)
    res.send(JSON.stringify(response))
})

app.get('/getip', function (req, res) {
    var result = { ip: ip.address(), port: PORT }
    res.send(JSON.stringify(result))
})

function setRingStatus(status) {
    if (ringStatus == ONSTART && status == INAIR) {
        gameStarted()
    } else if (ringStatus == INAIR && gameStatus == INGAME && status == ONPIPE) {
        lives--
        if (lives <= 0) {
            gameStatus = GAMEOVER
            var d = new Date()
            stoppedAt = d.getTime()
            sound = 'gameover'
        } else {
            sound = 'failed'
        }
    } else if (ringStatus == INAIR && status == ONSTART) {
        lives = MAXLIVES
        gameStatus = ONSTART
    } else if (ringStatus == INAIR && gameStatus == INGAME && status == ONSTOP) {
        var d = new Date()
        stoppedAt = d.getTime()
        gameStatus = GAMEFINISHED
        sound = 'success'
    } else {
        console.log('WARNING!!! Not handled event: ' + ringStatus + ' -> ' + status)
    }
    ringStatus = status
    console.log('Ring status changed to --> ' + ringStatus)
}

app.get('/gethighscore/:from/:to', function (req, res) {
    let from = req.params.from
    let to = req.params.to
    let top = db.slice(from, to)
    res.send(JSON.stringify(top))
})

app.listen(PORT, () => console.log('Server listening on port ' + PORT + '!'))

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

function inicDb() {
    fs.readFile(DBFILE, function (err, data) {
        if (err) {
            let timestamp = new Date(1985 + 1, 12 - 1, 31, 0, 0, 0, 0);
            for (let i = 0; i < MAXTOP; i++) {
                db.push(
                    {
                        id: i + 1,
                        timeHuman: getReadable(0),
                        time: 1e9,
                        name: 'MYSTIQUE',
                        timestamp: getHHHHMMDDfromTimestamp(timestamp)
                    }
                )
            }
            let data = JSON.stringify(db, null, 2);
            fs.writeFileSync(DBFILE, data);
        } else {
            db = JSON.parse(data)
        }

    })

}

function insertRow(time, name) {
    var d = new Date()
    var timestamp = d.getTime()
    db.push(
        {
            id: 0,
            timeHuman: getReadable(time * 1),
            time: time * 1,
            name: name,
            timestamp: getHHHHMMDDfromTimestamp(timestamp)
        }
    )
    //order by time asc
    db.sort(compare)
    //renumber id
    for (let i = 0; i < db.length; i++) {
        db[i].id = i + 1;
    }
    let data = JSON.stringify(db, null, 2);
    fs.writeFileSync(DBFILE, data);
}

function compare(a, b) {
    if (a.time < b.time)
        return -1;
    if (a.time > b.time)
        return 1;
    return 0;
}

function gameStarted() {
    var d = new Date()
    gameStatus = INGAME
    ringStatus = INAIR
    lives = MAXLIVES
    startedAt = d.getTime()
    sound = 'started'
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

function getTextByRingStatus(s) {
    if (s == ONPIPE) {
        return 'ON PIPE'
    } else if (s == ONSTART) {
        return 'ON START'
    } else if (s == ONSTOP) {
        return 'ON STOP'
    } else if (s == INAIR) {
        return 'IN AIR'
    } else {
        return 'NOPE'
    }
}
