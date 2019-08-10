const {pool} = require('../db');
const bcrypt = require('bcryptjs');

/**
 *
 * @param {String} username
 * @param {String} password
 * @return {Promise}
 */
function isCorrect(username, password) {
  return new Promise((resolve, reject) => {
    pool.query(
        `SELECT password FROM users WHERE username=? AND verified!=?`,
        [username, 0],
        (error, results) => {
          if (error) {
            return reject(error);
          }
          if (!results.length) {
            return reject('Account does not exist or email not verified');
          }
          bcrypt.compare(password, results[0].password, (error, res) => {
            if (error) {
              return reject(error);
            }

            if (!res) {
              return resolve(false);
            } else {
              return resolve(true);
            }
          });
        }
    );
  });
}

/**
 *
 * @param {*} param0
 * @param {String} param0.username
 * @param {String} param0.password
 * @param {String} param0.new_password
 * @return {Promise}
 */
function updatePassword({username, password, new_password: newPassword}) {
  return new Promise(async (resolve, reject) => {
    let ans;
    try {
      ans = await isCorrect(username, password);
    } catch (error) {
      return reject(error);
    }
    if (ans) {
      bcrypt.genSalt(parseInt(process.env.SALT_ROUNDS), (error, salt) => {
        if (error) {
          return reject(error);
        }
        bcrypt.hash(newPassword, salt, (error, hash) => {
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
                return resolve('Password updated');
              }
          );
        });
      });
    } else {
      return reject('Password incorrect');
    }
  });
}

module.exports = updatePassword;
