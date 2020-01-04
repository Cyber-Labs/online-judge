const { pool } = require('../db');

/**
 * @param {String} questionid
 * @param {String} contestid
 * @param {String} username
 * @param {String} user_output
 * @param {Number} score
 * @param {Number} isNegative
 * @param {Number} isPartial
 * @param {Number} maxMarks
 */

const calclulateScore = (contestId, questionId, userSolution) => {
  return new Promise((resolve, reject) => {
    pool.query(
    `SELECT solution AS solution AND partial AS partial AND negative AS negative AND max_marks AS maxMarks
    FROM questions
    WHERE contest_id = ? AND question_id = ?`,
    [contestId, questionId],
    (error, results) => {
      if (error) {
        return reject(error);
      }
      const actualSolution = results[0].solution;
      const partialMarking = results[0].partial;
      const negativeMarking = results[0].negative;
      const maxMarks = results[0].maxMarks;

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
          count++;
        }
        return resolve(score);
      }

      if (negativeMarking !== 0) {
        let count = 0;
        let score = 0;
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
  })
};

async function updateScore({
  question_id: questionId,
  contest_id: contestId,
  username,
  user_output: userOutput
}) {
  return new Promise((resolve, reject) => {
    const score = await calclulateScore(contestId, questionId, userOutput);
    pool.query(
      `INSERT INTO submissions (contest_id, question_id, username, user_ouput, score)
       VALUES (?,?,?,?,?)`,
      [contestId, questionId, username, userOutput, score],
      (error, results) => {
        if (error) {
          return reject('Not found');
        }
        return resolve(results);
      }
    );
  });
}

module.exports = {
  updateScore
};
