const { pool } = require('../db');

/**
 * @returns {Array} contestId
 */

function contestMap() {
  return new Array(function(resolve, reject) {
    pool.query(
      'SELECT id FROM contests WHERE status = 1 OR status = 2 AND confidential = 0',
      (error, results) => {
        if (error) {
          return reject('Questions not found');
        }
        return resolve(results);
      }
    );
  });
}

module.exports = contestMap;
