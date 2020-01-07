const schema = {
  required: ['username', 'contestId'],
  properties: {
    username: {
      type: 'string',
      minLength: 4
    },
    contestId: {
      type: 'number'
    }
  },
  errorMessage: {
    required: {
      username: 'Username required',
      contestId: 'Contest Id required'
    },
    properties: {
      username: 'Invalid username',
      contestId: 'Invalid Contest Id'
    }
  }
};

module.exports = schema;
