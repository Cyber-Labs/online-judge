const { pool } = require('../db');

/**
 *
 * @param {*} param0
 * @param {String} param0.username
 * @param {String} param0.email
 * @param {Number} param0.otp
 * @return {Promise}
 */
function verifyNewEmail({ username, email, otp }) {
  return new Promise((resolve, reject) => {
    pool.query(
      `UPDATE users SET email=? WHERE username=? AND otp=? AND otp_valid_upto>=NOW()`,
      [email, username, otp],
      (error, results) => {
        if (error) {
          return reject(error);
        }
        if (!results.changedRows) {
          return reject(
            'Account does not exist with this username or otp is invalid'
          );
        }
        return resolve(results);
      }
    );
  });
}

module.exports = verifyNewEmail;
