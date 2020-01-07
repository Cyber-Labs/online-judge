const { pool } = require('../db');

/**
 * @param {String} username
 * @returns {Promise}
 */

function groupMap(username) {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT group_id FROM usergroupsmap WHERE username=?`,
      [username],
      (error, results) => {
        if (error) {
          return reject(error);
        }
        return resolve(results);
      }
    );
  });
}

module.exports = groupMap;
