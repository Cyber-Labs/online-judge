const { pool } = require('../db');

function getAllContests(username) {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT contest_id FROM admin_of_contest WHERE admin_name=?`,
      [username],
      (error, results) => {
        if (error) {
          return reject(error);
        }
        if (!results.length) {
          return reject('No contests');
        }
        let contestIdArr = results.map(result => result.contest_id);
        pool.query(
          `SELECT * FROM contests WHERE id IN (?)`,
          [contestIdArr],
          (error, resultss) => {
            if (error) {
              return reject(error);
            }
            return resolve(resultss);
          }
        );
      }
    );
  });
}

module.exports = getAllContests;
