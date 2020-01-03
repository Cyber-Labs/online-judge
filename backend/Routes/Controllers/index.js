const authRouter = require('./auth');
const contestRouter = require('./contests');
const express = require('express');
const router = express.Router();

router.use('/auth', authRouter);
router.use('/contests', contestRouter);
module.exports = router;
