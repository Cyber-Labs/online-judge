const { pool } = require('../db');

/**
 * @param {Number} questionId
 * @returns {Promise}
 */

function getQuestion(questionId) {
  return new Promise((resolve, reject) => {
    pool.query(
      'SELECT * FROM questions WHERE  id = ?',
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

module.exports = getQuestion;
