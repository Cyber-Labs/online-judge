const { pool } = require('../db');

function deleteContest({ username, contest_id: contestId }) {
  return new Promise((resolve, reject) => {
    pool.query(
      'UPDATE contests,admin_of_contest,questions SET contests.delete_status=1 AND admin_of_contest.delete_status=1 AND questions.delete_status=1 WHERE (SELECT is_admin FROM admin_of_contest WHERE admin_name =? AND contest_id = ?) ',
      [username, contestId],
      (error, results) => {
        if (error) {
          return reject(error);
        }
        if (results.affectedRows == 0) {
          return reject('You are not an admin');
        }
        return resolve('Successfully deleted');
      }
    );
  });
}

module.exports = deleteContest;
