const bcrypt = require('bcryptjs');
const {pool} = require('../db');

/**
 *
 * @param {*} param0
 * @param {String} param0.username
 * @param {String} param0.password
 * @param {String} param0.password_confirm
 * @param {Number} param0.otp
 * @return {Promise}
 */
function resetPassword({
  username,
  password_confirm: passwordConfirm,
  password,
  otp,
}) {
  return new Promise((resolve, reject) => {
    if (password !== passwordConfirm) {
      return reject('Two passwords do not match');
    }
    bcrypt.genSalt(parseInt(process.env.SALT_ROUNDS), (error, salt) => {
      if (error) {
        return reject(error);
      }
      bcrypt.hash(password, salt, (error, hash) => {
        if (error) {
          return reject(error);
        }
        pool.query(
            `UPDATE users SET password=?,otp_valid_upto=NOW() WHERE username=? AND otp_valid_upto>=NOW() AND otp=?`,
            [hash, username, otp],
            (error, results) => {
              if (error) {
                return reject(error);
              }
              if (!results.changedRows) {
                return reject('Invalid otp or incorrect username');
              }
              return resolve(results);
            }
        );
      });
    });
  });
}

module.exports = resetPassword;
