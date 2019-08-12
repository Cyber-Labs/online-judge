const {pool} = require('../db');
/**
 *
 * @param {Object} param0
 * @param {String} param0.username
 * @param {Number} param0.group_id
 * @return {Promise}
 */
function deleteGroup({
    username,
    group_id : group_id,
}) {
   return new Promise((resolve,reject) => {
    pool.query(`DELETE FROM groups WHERE id = ? AND
    (SELECT COUNT(username) FROM UserGroups WHERE (username=? AND admin=1 AND group_id = ?))`,
    [
        group_id,
        username,
        group_id,

    ],function(error, results) {
        if (error) {
          reject(error);
          return;
        }
        resolve(results);
      }
    );
  });
}
module.exports = deleteGroup;