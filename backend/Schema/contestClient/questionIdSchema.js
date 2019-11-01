const schema = {
  required: ['contestId', 'questionId'],
  properties: {
    contestId: { type: 'number' },
    questionId: { type: 'number' }
  },
  errorMessage: {
    required: {
      contestId: 'Contest id required',
      questionId: 'question id required'
    },
    properties: {
      contestId: 'Invalid contest id',
      questionId: 'Invalid question id'
    },
    _: 'Invalid data'
  }
};

module.exports = schema;
