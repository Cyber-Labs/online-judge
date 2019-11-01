const authRouter = require('./auth');
const contestRouter = require('./contest_client');
const express = require('express');
const router = express.Router();
router.use('/', contestRouter);
router.use('/auth', authRouter);

module.exports = router;
