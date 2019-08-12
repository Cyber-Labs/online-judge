const {pool} = require('../db');
/**
 *
 * @param {Object} param0
 * @param {String} param0.username
 * @param {String} param0.group_id
 * @param {Number} param0.usernameToChange
 * @return {Promise}
 */


function makeUserAdmin({
    username,
    group_id: group_id,
    admin: admin,
    usernameToChange : usernameToChange
}){
    return new Promise(function(resolve, reject) {
      pool.query(`UPDATE UserGroups SET admin = 1 WHERE username=? AND group_id = ?
      (SELECT COUNT(username) FROM UserGroups WHERE (username=? AND admin=1) `,
    [
      usernameToChange,
      group_id,
      username,
    ],
        function(error, results) {
          if (error) {
            reject(error);
            return;
          }
          resolve(results);
        }
      );
    });
  }

  module.exports = makeUserAdmin;