const editContestSchema = {
  required:['username','contest_id','title','about','rules','prize','start_time','end_time','group_id','confidential']
  properties: {
    username: {type: 'string'},
    contest_id:{type:'string'}
    title:{type:'string'}
    about: {type: 'string'},
    rules: {type:'number'},
    prize: {type: 'string'},
    start_time:{type: 'string'},
    end_time:{type: 'string'},
    group_id:{type: 'number'},
    confidential:{type: 'boolean'}
  },
  errorMessage: {
    required: {
      username: 'Username required',
      contest_id: 'Contest id required',
      title:"Title required",
      about: 'About required',
      rules: 'Rules required',
      prize: 'Prize required',
      start_time: 'Start time required',
      end_time: 'End time required',
      group_id: 'Group Id required',
      confidential: 'Confidetial Status required',
    },
    properties: {
      username: 'Invalid username',
      contest_id:'Invalid contest id'
      title: 'Invalid Title',
      about: 'Invalid About',
      rules: 'Invalid Rules',
      prize: 'Invalid Prize',
      start_time: 'Invalid Start time',
      end_time: 'Invalid End time',
      group_id: 'Invalid Group Id',
      confidential: 'Invalid Confidetial Status',
    },
    _: 'Invalid data',
  }
  
};

module.exports = editContestSchema;
