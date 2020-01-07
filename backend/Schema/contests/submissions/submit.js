const schema = {
  required: [
    'username',
    'contestId',
    'questionId',
    'questionName',
    'userOutput',
    'negativeMarking',
    'partialMarking',
    'maxScore',
    'questionType'
  ],
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
    },
    userOutput: {
      type: 'string'
    },
    negativeMarking: {
      type: 'number'
    },
    partialMarking: {
      type: 'number'
    },
    maxScore: {
      type: 'number'
    },
    questionType: {
      type: 'number'
    }
  },
  errorMessage: {
    required: {
      username: 'Username required',
      contestId: 'Contest Id required',
      questionId: 'Question Id required',
      questionName: 'Question name required',
      userOutput: 'User Output required',
      negativeMarking: 'Negative marking required',
      partialMarking: 'Partial Marking required',
      maxScore: 'Maximum Score required',
      questionType: 'Question type required'
    },
    properties: {
      username: 'Invalid Username',
      contestId: 'Invalid Contest Id',
      questionId: 'Invalid Question Id',
      questionName: 'Invalid Question name',
      userOutput: 'Invalid User Output',
      negativeMarking: 'Invalid Negative marking',
      partialMarking: 'Invalid Partial Marking',
      maxScore: 'Invalid Maximum Score',
      questionType: 'Invalid Question type'
    }
  }
};

module.exports = schema;
