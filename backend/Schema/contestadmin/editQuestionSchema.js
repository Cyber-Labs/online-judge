  const editQuestionSchema = {
  required: ['username','contest_id','question_id','type','question_name','problemstatement','solution','max_score','negative','partial','difficulty','answer']
  properties: {
    username:{type:'string'},
    contest_id:{type:'number'},
    question_id:{type:'number'},
    question_name:{type:'string'},
    type:{type:'integer'},
    problemstatement:{type:'string'},
    solution:{type:'string'},
    max_score:{type:'number'},
    negative:{type:'number'},
    partial:{type:'number'},
    difficulty:{type:'string'},
    answer:{type:'string'}
  },
  errorMessage: {
    required: {
      username: 'Username required',
      contest_id: 'Contest id required',
      question_id:'Question id required',
      question_name:'Question name required',
      type;'Type required',
      problemstatement:'Problem statement required',
      solution:'Answer required',
      max_score:'Maxscore required',
      negative:'Negative scheming required'
      partial:'Partial scheming required',
      difficulty:'Difficulty level required'
      answer:'Answer required'
    },
    properties: {
      username: 'Invalid username',
      contest_id: 'Invalid contest id',
      question_id:'Invalid question id'
      question_name: 'Invalid question name',
      type: 'Invalid question type',
      problemstatement: 'Invalid problem statement',
      solution: 'Invalid solution',
      max_score: 'Invalid maximum score',
      negative: 'Invalid negative marking',
      partial: 'Invalid partial marking',
      difficulty: 'Invalid difficulty level',
      answer: 'Invalid answer',
    },
    _: 'Invalid data',
  },
 
};

module.exports = editQuestionSchema;
