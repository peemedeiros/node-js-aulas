const express = require('express')
const app = express()
const authMid = require('./middlewares/auth');

app.use(express.json())

let allowCrossDomain = (req,res,next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', '*')
    res.header('Access-Control-Allow-Headers', '*')
    next()
}

const auth = require('./routes/authRoutes')
const series = require('./routes/seriesRoutes')

app.use(allowCrossDomain)
app.use('/auth', auth)

app.use(authMid);

app.use('/series', series)

module.exports = app