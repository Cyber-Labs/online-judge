const getSingleQuestionSchema = {
  required:['username','contest_id','question_id']
  properties: {
    username: {type:'string'},
    contest_id:{type:'number'},
    question_id:{type:'number'}
  },
  errorMessage: {
    required: {
      username: 'Username required',
      contest_id: 'Contest id required',
      question_id: 'Question id required',
      
    },
    properties: {
      username: 'Invalid username',
      contest_id: 'Invalid contest id',
      question_id: 'Invalid question id',
    },
    _: 'Invalid data',
  }
  
};

module.exports = getSingleQuestionSchema;
