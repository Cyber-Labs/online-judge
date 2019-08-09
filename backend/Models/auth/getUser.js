const {pool} = require('../db');

/**
 *
 * @param {String} username
 * @return {Promise}
 */
function getUser(username) {
  return new Promise((resolve, reject) => {
    pool.query(
        `SELECT * FROM users WHERE username=?`,
        [username],
        (error, results) => {
          if (error) {
            return reject('User not found');
          }
          return resolve(results);
        }
    );
  });
}

module.exports = getUser;
