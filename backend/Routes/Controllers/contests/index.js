const express = require('express');
const router = express.Router();
const submission = require('./submission');
const subjective = require('./subjective');

router.use(submission);
router.use(subjective);

module.exports = router;
