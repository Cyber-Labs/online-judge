// importing dependencies
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// importing routers
var questionRouter = require('./routes/Question');
var submissionRouter = require('./routes/Submission');
var successRouter = require('./routes/Success');
var failRouter = require('./routes/Fail');

//starting
var app = express();

// setting middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// setting question router
app.get('/contest/contestID/questionID', questionRouter)
app.get('/contest/contestID/questionID/submission', submissionRouter)
app.get('/contest/contestID/questionID/success', successRouter)
app.get('/contest/contestID/questionID/fail', failRouter)


var text = 'This is Landing Page of website, For Opening a question of  the contest page, Goto "/contest/contestID/qestionID"'
app.get('/', (request, response) => {
  response.send(`${text}`)
})

var port = 3000;
app.listen(port, () => {
  console.log(`Listening to port ${port}`)
})
