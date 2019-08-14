const {pool} = require('../db');

/**
 *
 * @param {String} username
 * @return {Promise}
 */
/*function checkadmin(username) {
  return new Promise((resolve, reject) => {
    pool.query(
        `SELECT isadmin FROM users WHERE username=?`,
        [username],
        (error, results) => {
          if (results[0].isadmin==0) {
            return reject('Not an admin');
          }
          return response(results);
        }
    );
  });
}
*/

function checkadmin(username){
  pool.query(
    `SELECT isadmin FROM users WHERE username=?`,
        [username],
        (error, results) => {
          if(error)
            return false;
          if (results[0].isadmin==0) {
            return false;
          }
          return true;
        })
 }
module.exports = checkadmin;