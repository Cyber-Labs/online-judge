const getSingleContestSchema = {
  required:['username','contest_id']
  properties: {
    username: {type: 'string'},
    contest_id:{type:'number'}
  },
  errorMessage: {
    required: {
      username: 'Username required',
      contest_id:'Contest id required'
    },
    properties: {
      username: 'Invalid username',
      contest_id: 'Invalid contest id', 
    },
    _: 'Invalid data',
  }
  
};

module.exports = getSingleContestSchema;
