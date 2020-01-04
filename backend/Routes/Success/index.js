var express = require('express');
var router = express.Router();

// creating middleware of time:
var requestTime = (request, response, next) => {
  request.requestTime = Date.now()
  next()
}
router.use(requestTime)
var question = (request, response) => {
  var resText = '<h1>Question Number 1: Submission Successful<br>'
  resText += `Submitted at: ${request.requestTime} <br><br>`
  response.send(resText)
}
router.get(
  '/contest/contestID/questionID/success',
  question
)

module.exports = router;