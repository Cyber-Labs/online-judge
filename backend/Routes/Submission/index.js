var express = require('express');
var submissionController = require('../../controllers/submission')
var router = express.Router();

// creating middleware of time:
var requestTime = (request, response, next) => {
  request.requestTime = Date.now()
  next()
}
router.use(requestTime)
router.use(submissionController.submission)

var question = (request, response) => {
  var resText = '<h1>Question Number 1: Checking output<br>'
  resText += `Submitted at: ${request.requestTime} <br><br>`
  response.send(resText)
}
router.get(
  '/contest/contestID/questionID/submission',
  question
)

module.exports = router;
