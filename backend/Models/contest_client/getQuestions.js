const {
  pool
} = require('../db')

/**
 * @param {Number} contestId
 * @returns {Promise}
 */

function getQuestions (contestId) {
  return new Promise((resolve, reject) => {
    pool.query(
      'SELECT id,questionName,questionType,questionDifficulty,questionScore FROM questions WHERE contest_id IN (?)',
      [contestId],
      (error, results) => {
        if (error) {
          return reject("request cannot be processed")
        }
        return resolve(results)
      }
    )
  })
}

module.exports = getQuestions
