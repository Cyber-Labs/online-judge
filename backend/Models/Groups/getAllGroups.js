const {pool} = require('../db');

/**
 *
 * @param {Object} param0
 * @param {String} param0.username
 * @return {Promise}
 */

function getAllGroups({
    username : username,
}) {
    return new Promise((resolve,reject) => {
        pool.query(`SELECT * FROM groups WHERE (SELECT COUNT(username) FROM users WHERE (username=? AND admin=1))`,
        [
            username
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
module.exports = getAllGroups;