const { pool } = require("../db");
/**
 *
 * @param {Object} param0
 * @param {String} param0.username
 * @param {String} param0.description
 * @param {Number} param0.group_id
 * @return {Promise}
 */
function updateGroup({
  username,
  group_id: group_id,
  description: description
}) {
  return new Promise((resolve, reject) => {
    pool.query(
      `UPDATE groups SET description=? WHERE
            (SELECT COUNT(username) FROM UserGroups WHERE (username=? AND admin=1 AND group_id = ?))`,
      [description, username, group_id],
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
module.exports = updateGroup;
