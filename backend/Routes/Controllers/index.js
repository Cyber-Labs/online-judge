const authRouter = require('./auth');
const contestRouter = requrie('./contests');
const express = require('express');
const router = express.Router();

router.use('/auth', authRouter);
router.use('/contests',contestRouter);


module.exports = router;
