const { pool } = require('../db');

/**
 * @param {Number} contestId
 * @returns {Promise}
 */

function getQuestions(contestId) {
  return new Promise((resolve, reject) => {
    pool.query(
      'SELECT id,name,type,difficulty,max_score FROM questions WHERE contest_id = ?',
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

module.exports = getQuestions;
