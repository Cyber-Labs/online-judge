const { pool } = require("../db");

/**
 * @param {Number} contestId
 * @param {String} username
 * @return {Promise}
 */
function result({ contestId, username }) {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT question_name AS Question AND user_output AS Output AND score AS Score
      FROM submissions
      WHERE contest_id=? AND username=?`,
      [contestId, username],
      (error, results) => {
        if (error) {
          return reject("Result not found");
        }
        return resolve(results);
      }
    );
  });
}

module.exports = result;
