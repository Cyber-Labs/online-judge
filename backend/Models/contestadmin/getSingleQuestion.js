const {pool} = require('../db');

function getSingleQuestion({question_id:questionId}) {
  return new Promise((resolve, reject) => {
    pool.query(
        `SELECT * FROM questions WHERE id=?`,
        [questionId],
        (error, results) => {
          if (error) {
            return reject(error);
          }
          return resolve(results);
        }
    );
  });
}

module.exports=getSingleQuestion;