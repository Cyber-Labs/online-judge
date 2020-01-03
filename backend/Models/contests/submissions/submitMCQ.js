const { pool } = require('../../db');

/**
 * @param {Number} contestId
 * @param {Number} questionId
 * @param {String} questionName
 * @param {String} username
 * @param {String} userOutput
 * @param {Number} negativeMarking
 * @param {Number} partialMarking
 * @param {Number} maxMarks
 * @return {Promise}
 */

function calculateScore(
  userSolution,
  negativeMarking,
  partialMarking,
  maxMarks
) {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT solution AS solution
    FROM questions
    WHERE contest_id = ? AND question_id = ?`,
      [contestId, questionId],
      (error, results) => {
        if (error) {
          return reject(error);
        }
        const actualSolution = results[0].solution;

        if (userSolution === actualSolution) {
          return resolve(maxMarks);
        }

        userSolution = userSolution.toUpperCase().split(',');
        actualSolution = actualSolution.toUpperCase();
        const userLength = userSolution.length;

        if (negativeMarking === 0 && partialMarking === 0) {
          return resolve(0);
        }

        if (negativeMarking === 0 && partialMarking !== 0) {
          let count = 0;
          let score = 0;
          while (count < userLength) {
            const position = actualSolution.indexOf(userSolution[count]);
            if (position !== -1) {
              score += partialMarking;
            }
            userOutput, negativeMarking, partialMarking, maxMarks;
            count++;
          }
          count = 0;
          score = 0;
          while (count < userLength) {
            const position = actualSolution.indexOf(userSolution[count]);
            if (position === -1) {
              score += negativeMarking;
            }
            score += partialMarking;
          }
          return resolve(score);
        }
      }
    );
  });
}

function submitMCQ({
  contestId,
  questionId,
  questionName,
  username,
  userOutput,
  negativeMarking,
  partialMarking,
  maxMarks
}) {
  return new Promise(async (resolve, reject) => {
    const score = await calculateScore(
      userOutput,
      negativeMarking,
      partialMarking,
      maxMarks
    );
    pool.query(
      `INSERT INTO submissions
      (contest_id, question_id, question_name username, user_ouput, score)
       VALUES (?,?,?,?,?,?)`,
      [contestId, questionId, questionName, username, userOutput, score],
      (error, results) => {
        if (error) {
          return reject('Not found question');
        }
        return resolve(results);
      }
    );
  });
}

module.exports = {
  submitMCQ
};
