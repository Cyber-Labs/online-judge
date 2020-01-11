const schema = {
  required: ['username', 'contestId', 'questionId', 'questionName'],
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
    questionName: {
      type: 'string'
    }
  },
  errorMessage: {
    required: {
      username: 'Username required',
      contestId: 'Contest Id required',
      questionId: 'Question Id required',
      questionName: 'Question name required'
    },
    properties: {
      username: 'Invalid Username',
      contestId: 'Invalid Contest Id',
      questionId: 'Invalid Question Id',
      questionName: 'Invalid Question name'
    }
  }
};

module.exports = schema;
