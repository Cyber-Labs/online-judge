const { pool } = require('../db');

/**
 * @returns {Promise}
 */

function getCompletedContests() {
  return new Promise(function(resolve, reject) {
    pool.query(
      `SELECT id,(CASE 
                WHEN (CURRENT_TIMESTAMP-start_time >0 AND CURRENT_TIMESTAMP-end_time<0)=1 THEN 1 
                WHEN (CURRENT_TIMESTAMP - end_time>0)=1 THEN 2
                WHEN (CURRENT_TIMESTAMP - start_time<0)=1 THEN 0
                END) this_status
                FROM contests AS c WHERE this_status = 2;
                `,
      (error, results) => {
        if (error) {
          return reject(error);
        }
        return resolve(results);
      }
    );
  });
}

module.exports = getCompletedContests;
