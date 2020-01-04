const { pool } = require('../db');

/**
 * @param {String} questionid
 * @param {String} contestid
 * @param {String} username
 * @param {String} user_output
 * @param {Number} score
 */

function submitSubjective({
  question_id: questionId,
  contest_id: contestId,
  username,
  user_output: userOutput
}) {
  return new Promise((resolve, reject) => {
    pool.query(
      `INSERT INTO submissions (contest_id, question_id, username, user_output)
      VALUES (?,?,?,?)`,
      [contestId, questionId, username, userOutput],
      (error, results) => {
        if (error) {
          return reject('Not found');
        }
        return resolve(results);
      }
    );
  });
}

module.exports = submitSubjective;
