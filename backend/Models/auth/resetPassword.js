const bcrypt = require('bcryptjs');
const {pool} = require('../db');

/**
 *
 * @param {*} param0
 * @param {String} param0.username
 * @param {String} param0.password
 * @param {String} param0.password_confirm
 * @return {Promise}
 */
function resetPassword({
  username,
  password_confirm: passwordConfirm,
  password,
}) {
  return new Promise((resolve, reject) => {
    if (password !== passwordConfirm) {
      return reject('Two passwords are not equal');
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
            `UPDATE users SET password=? WHERE username=?`,
            [hash, username],
            (error, results) => {
              if (error) {
                return reject(error);
              }
              return resolve(results);
            }
        );
      });
    });
  });
}

module.exports = resetPassword;
