const {pool} = require('../db');


/**
 *
 * @param {Object} param0
 * @param {String} param0.username
 * @param {String} param0.group_id
 * @param {String} param0.admin  
 * @param {Number} param0.Userid
 * @return {Promise}
 */


function addUserToGroup({
    username,
    group_id: group_id,
    admin: admin,
    usernameToAdd : usernameToAdd
}){
    return new Promise(function(resolve, reject) {
      pool.query(`INSERT INTO UserGroups(username,group_id,admin) VALUES (?,?,?) WHERE
      (SELECT COUNT(username) FROM UserGroups WHERE (username=? AND admin=1) `,
    [
      usernameToAdd,
      group_id,
      admin,
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
  module.exports = addUserToGroup;