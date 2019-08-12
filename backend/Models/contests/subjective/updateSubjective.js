const { pool } = require("../../db");

function updateSubjective({ contestId, questionId, username, score }) {
  return new Promise((resolve, reject) => {
    pool,
      query(
        `UPDATE submissions
        SET score = ?
        WHERE contestId = ? AND questionId = ? AND USERNAME = ?`,
        [score, contestId, questionId, username],
        (error, results) => {
          if (error) {
            return reject("User not found");
          }
          return resolve(results);
        }
      );
  });
}
module.exports = updateSubjective;
