const { pool } = require("../db");

function getSingleContest({ username, contest_id: contestId }) {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT * FROM contests WHERE id=? WHERE (SELECT is_admin FROM admin_of_contest WHERE admin_name =? AND contest_id = ?) is not null`,
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

module.exports = getSingleContest;
