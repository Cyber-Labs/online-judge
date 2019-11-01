const getContests = require('./getContests');
const getAllQuestions = require('./getAllQuestions');
const getQuestion = require('./getQuestion');
const getQuestions = require('./getQuestions');
const groupMap = require('./groupMap');
const sort = require('./sort');
const contestMap = require('./contestMap');
const getCompletedContests = require('./getCompletedContests');

module.exports = {
  getContests,
  getAllQuestions,
  getQuestions,
  getQuestion,
  groupMap,
  sort,
  contestMap,
  getCompletedContests
};
