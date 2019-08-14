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

module.exports = isCorrect;
