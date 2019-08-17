const authRouter = require('./auth');
const express = require('express');
const router = express.Router();

router.use('/auth', authRouter);

module.exports = router;
