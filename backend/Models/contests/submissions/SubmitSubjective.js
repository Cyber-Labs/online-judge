const { pool } = require('../../db');

/**
 * @param {Number} questionid
 * @param {Number} contestid
 * @param {String} username
 * @param {String} userOutput
 * @param {String} questionName
 * @return {Promise}
 */

function submitSubjective({
  questionId,
  contestId,
  username,
  questionName,
  userOutput
}) {
  return new Promise((resolve, reject) => {
    pool.query(
      `INSERT INTO submissions
      (contest_id, question_id, question_name, username, user_output)
      VALUES (?,?,?,?,?)`,
      [contestId, questionId, questionName, username, userOutput],
      (error, results) => {
        if (error) {
          return reject('Not found question');
        }
        return resolve(results);
      }
    );
  });
}

module.exports = submitSubjective;
