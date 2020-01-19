var express = require('express');
var router = express.Router();

//creating button function:
var handleClick = () => {
  console.log('button Clicked')
}
// var button = () => {
//   <div>
//      <h1>
//        Question Number 1
//      </h1>
//      <h2>
//        Requested at {request.requestTime}
//      </h2> <br /> <br />
//      <input type="file"> Upload File </input>
//      <button onClick={
//        console.log('button clicked')
//      }>
//        Submit
//       </button>
//    </div>
//}

// creating middleware of time:
var requestTime = (request, response, next) => {
  request.requestTime = Date.now()
  next()
}
router.use(requestTime)
var question = (request, response) => {
  var resText = '<h1>Question Number 1<br>'
  resText += `Requested at: ${request.requestTime} <br><br>`
  resText += '<button>Upload File</button><br><br>'
  resText += `<button>Submit</button></h1>`
  resText += `Suppose the submit button is clicked, the route will be changed to`
  resText += `/contest/contestID/questionID/submission`
  response.send(resText)
}
router.get(
  '/contest/contestID/questionID',
  question
)

module.exports = router;
