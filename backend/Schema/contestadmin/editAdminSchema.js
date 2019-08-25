const editAdminSchema = {
  required: ['username', 'contest_id', 'adminname', 'newvalue'],
  properties: {
    username: { type: 'string' },
    contest_id: { type: 'number' },
    adminname: { type: 'string' },
    newvalue: { type: 'integer' }
  },
  errorMessage: {
    required: {
      username: 'Username required',
      contest_id: 'Contest id required',
      adminname: 'Admin name required',
      newvalue: 'New value required'
    },
    properties: {
      username: 'Invalid username',
      contest_id: 'Invalid contest id',
      adminname: 'Invalid admin name',
      newvalue: 'Invalid new value'
    },
    _: 'Invalid data'
  }
};

module.exports = editAdminSchema;
