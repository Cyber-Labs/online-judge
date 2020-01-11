const { pool } = require('../db');

/**
 * @param {Number} contestId
 * @returns {Promise}
 */

function getAllQuestions(maparray) {
  return new Promise((resolve, reject) => {
    pool.query(
      'SELECT id,contest_id,name,type,difficulty,max_score FROM questions WHERE contest_id IN (?)',
      [maparray],
      (error, results) => {
        if (error) {
          return reject(error);
        }
        return resolve(results);
      }
    );
  });
}

module.exports = getAllQuestions;
