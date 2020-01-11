const { pool } = require('../db');

/**
 * @param {Array} groupIdArray
 * @returns {Promise}
 */

function getContests(groupIdArray) {
  return new Promise(function(resolve, reject) {
    pool.query(
      `SELECT c.*,(CASE 
                WHEN (CURRENT_TIMESTAMP-start_time >0 AND CURRENT_TIMESTAMP-end_time<0)=1 THEN 1 
                WHEN (CURRENT_TIMESTAMP - end_time>0)=1 THEN 2
                WHEN (CURRENT_TIMESTAMP - start_time<0)=1 THEN 0
                END) this_status
                FROM contests AS c WHERE group_id IN (?);
                `,
      groupIdArray,
      (error, results) => {
        if (error) {
          return reject('Contest not found');
        }
        return resolve(results);
      }
    );
  });
}

module.exports = getContests;
