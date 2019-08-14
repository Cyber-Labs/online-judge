const {pool} = require('../db');
function getaAllQuestions({contest_id:contestId}) {
  return new Promise((resolve, reject) => {
    pool.query(
        `SELECT * FROM questions WHERE contest_id=?`,
        [contestId],
        (error, results) => {
          if (error) {
            return reject(error);
          }
          return resolve(results);
        }
    );
  });
}

module.exports=getAllQuestions;