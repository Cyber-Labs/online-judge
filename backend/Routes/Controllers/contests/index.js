const express = require("express");
const router = express.Router();
const submission = require("./submission");

router.use(submission);

module.exports = router;
