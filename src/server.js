const express = require('express')
const app = express()

app.use(express.json())

const series = require('./routes/seriesRoutes')

app.use('/series', series)

module.exports = app