const { pool } = require("../../db");

/**
 * @param {String} username
 * @param {Number} contestId
 * @param {Number} questionId
 * @param {String} questionName
 * @return {Promise}
 */

function checkSubjective({ username, contestId, questionId, questionName }) {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT user_output AS output
      FROM submissions
      WHERE contest_id = ? AND question_id = ? question_name = ? AND username = ?`,
      [contestId, questionId, questionName, username],
      (error, results) => {
        if (error) {
          return reject("Result not found");
        }
        return resolve(results);
      }
    );
  });
}
module.exports = checkSubjective;
