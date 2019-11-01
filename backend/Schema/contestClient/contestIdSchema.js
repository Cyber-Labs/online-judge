const schema = {
  required: ['contestId'],
  properties: {
    contestId: { type: 'number' }
  },
  errorMessage: {
    required: {
      contestId: 'Contest id required'
    },
    properties: {
      contestId: 'Invalid contest id'
    },
    _: 'Invalid data'
  }
};

module.exports = schema;
