/**
 * My app
 *
 */

const express = require('express')
const app = express()
const PORT = 3000;

//app.set('views', './views')
app.set('view engine', 'pug')
app.use(express.static('public'))

app.get('/', (req, res) => {
    res.render('index', { title: 'Hey', message: 'Hello there' })
})

app.listen(PORT, () => console.log('Example app listening on port 3000!'))