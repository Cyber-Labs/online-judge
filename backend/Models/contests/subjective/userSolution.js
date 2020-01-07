const { pool } = require("./../../db");

/**
 * @param {String} username
 * @param {String} contestId
 * @param {String} questionId
 */

function userSolution({
  username,
  contest_id: contestId,
  question_id: questionId
}) {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT user_output AS userSolution FROM submissions
      WHERE contest_id = ? AND question_id = ? AND username = ?`,
      [contestId, questionId, username],
      (error, results) => {
        if (error) {
          return reject("Not found");
        }
        return resolve(results);
      }
    );
  });
}

module.exports = userSolution;
