function Player() {
    this.time = 0
    this.status = ONSTART
    this.hint = 0
    this.startedAt = 0
    this.pausedAt = 0
    this.targetTime = 0
    this.txtStartsoon = ''
    this.txtPaused = ''
    this.txtHints = ''
    this.txtOpponenthints = ''
    this.inicGame = function () {
        this.hint = 0
        this.status = ONSTART
    }
    this.startGame = function () {
        if (this.status == ONSTART) {
            var d = new Date()
            this.status = PLAYING
            this.startedAt = d.getTime()
            this.targetTime = this.startedAt + ONEHOUR
        }
    }
    this.incHint = function () {
        this.hint++
    }
    this.decHint = function () {
        this.hint--
        if (this.hint < 0) {
            this.hint = 0
        }
    }
    this.getData = function () {
        var d = new Date()
        var isHalf = Math.floor(d.getTime() / 1000) % 2 == 0
        this.message = ''
        var timeR
        if (this.status == ONSTART) {
            this.time = 0
            timeR = this.getReadable(this.time)
            if (isHalf) {
                this.message = this.txtStartsoon
            }
        } else if (this.status == PLAYING) {
            this.time = this.targetTime - d.getTime()
            timeR = this.getReadable(this.time)
            if (isHalf) {
                timeR = timeR.replace(':', ' ').replace(':', ' ')
            }
        } else if (this.status == PAUSED) {
            this.time = this.pausedAt
            timeR = this.getReadable(this.time)
            if (isHalf) {
                this.message = this.txtPaused
            }
        } else if (this.thstatus == FINISHED1 || this.status == FINISHED2) {

        }
        return {
            message: this.message,
            time: timeR,
            hinttext: this.txtHints,
            opphinttext: this.txtOpponenthints,
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