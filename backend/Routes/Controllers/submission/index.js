// SETTING CONTROLLER TO CHECK THE FILE'S OUTPUT

//importing correct and incorrect output
var user_output = require('./UserOutput')
var correct_output = require('./CorrectOutput')
exports.submission = async (request, response, next) => {

  // COMPARE BOTH OUTPUTS
  if(user_output === correct_output){
    response.send('Solution Correct, submission successful')
    return;
    // or direct to sucess page
  }

  response.send('Solution Incorrect')
}