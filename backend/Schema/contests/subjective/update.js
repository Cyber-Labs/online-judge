const schema = {
  required: ['username', 'contestId', 'questionId', 'score'],
  properties: {
    username: {
      type: 'string',
      minLength: 4
    },
    contestId: {
      type: 'number'
    },
    questionId: {
      type: 'number'
    },
    score: {
      type: 'number'
    }
  },
  errorMessage: {
    required: {
      username: 'Username required',
      contestId: 'Contest Id required',
      questionId: 'Question Id required',
      score: 'Maximum Score required'
    },
    properties: {
      username: 'Invalid Username',
      contestId: 'Invalid Contest Id',
      questionId: 'Invalid Question Id',
      score: 'Invalid Maximum Score'
    }
  }
};

module.exports = schema;
