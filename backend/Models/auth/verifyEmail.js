const { pool } = require('../db');

/**
 *
 * @param {*} param0
 * @param {String} param0.username
 * @param {String} param0.email
 * @param {Number} param0.otp
 * @return {Promise}
 */
function verifyEmail({ username, otp }) {
  return new Promise((resolve, reject) => {
    let query = `UPDATE users SET verified=?`;
    const arr = [1];
    query += `,otp_valid_upto=NOW() WHERE username=? AND otp=? AND otp_valid_upto>=NOW()`;
    arr.push(username);
    arr.push(otp);
    pool.query(query, arr, (error, results) => {
      if (error) {
        return reject(error);
      }
      if (!results.changedRows) {
        return reject(
          'Account does not exist with this username or otp is invalid'
        );
      }
      return resolve(results);
    });
  });
}

module.exports = verifyEmail;
