// GETTING THE ORIGINAL FILE LOCATION AND FETCHING CORRECT CODE

var mysql = require('mysql')
var fetch = require('fetch').fetchUrl
var file_name
var file_location
var code

// setting connection
var connection = mysql.createConnection({
  connectionLimit: 10,
  host: 'localhost',
  port: 3306,
  user: 'me',
  password: 'secret',
  database: 'my_db'
})
connection.connect((error) => {
  if (error) {
    console.error('error connecting: ' + error.stack)
    return
  }
  console.log('connected ad id ' + connection.threadId)
  response.send('Connected to database')
})

// database query
connection.query(
  'SELECT Location AS fileLocation, Name AS fileName'
  + 'FROM ContestSolutions'
  + 'WHERE ContestID={contestID} AND QuestionID={questionID}',
  (error) => {
    if (error) {
      throw error;
    }
    file_name = fileName;
    file_location = fileLocation;
    console.log(`The ${fileName} is present at ${fileLocation}`);
  }
)

//fetching file
fetch(
  String(fileLocation),
  (error, meta, response) => {
    if (error) {
      console.log(error);
      throw error;
    }
    return response.text();
  }
).then(
  (data_output) => {
    // store data output into something and export it
    output = data_output;
  }
).catch(
  (error) => {
    console.log(error);
  }
)

connection.end()
module.exports = code
