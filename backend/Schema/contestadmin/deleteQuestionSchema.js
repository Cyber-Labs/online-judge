const deleteQuestionSchema = {
  required: ['username', 'contest_id', 'question_id'],
  properties: {
    username: { type: 'string' },
    contest_id: { type: 'string' },
    question_id: { type: 'string' }
  }
};

module.exports = deleteQuestionSchema;
