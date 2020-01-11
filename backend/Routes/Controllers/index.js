const authRouter = require('./auth');
const contest = require('./contest_client');
const contestRouter = require('./contests');
const express = require('express');
const router = express.Router();
router.use('/', contest);
router.use('/auth', authRouter);
router.use('/contests', contestRouter);
module.exports = router;
