const express = require('express');
const app = express();
const router = require('./Controllers');
app.use(router);

module.exports = app;
