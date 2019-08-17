const express = require('express')
const app = express()
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
const router = require('./Controllers')
app.use(router)

module.exports = app
