const {pool} = require('../db');

function getSingleContest({
	username,
	contest_id:contestId;
}) {
  return new Promise((resolve, reject) => {
    pool.query(
        `SELECT * FROM contests WHERE id=?`,
        [contestId],
        (error, results) => {
          if (error) {
            return reject(error);
          }
          return resolve(results);
        }
    );
  });
}

module.exports=getSingleContest;