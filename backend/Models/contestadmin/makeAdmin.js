const { pool } = require('../db');

function makeAdmin({ username, contest_id: contestId, adminname, newvalue }) {
  return new Promise((resolve, reject) => {
    pool.query(
      'INSERT INTO admin_of_contest (admin_name,contest_id,is_admin) VALUES (?,?,?) WHERE (SELECT is_admin from admin_of_contest WHERE admin_name = ? AND contest_id = ?)',
      [adminname, contestId, newvalue, username, contestId],
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

module.exports = makeAdmin;
