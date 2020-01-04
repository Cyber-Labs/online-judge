const { pool } = require("../db");

/**
 * @param {String} contestid
 * @param {String} username
 * @return {Promise}
 */
function result({ contest_id: contestId, username }) {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT question_name AS Question AND user_output AS Output AND user_score AS Score
      FROM subissions
      WHERE contestID=? AND username=?`,
      [contestId, username],
      (error, results) => {
        if (error) {
          return reject("Not found");
        }
        return resolve(results);
      }
    );
  });
}

module.exports = result;
