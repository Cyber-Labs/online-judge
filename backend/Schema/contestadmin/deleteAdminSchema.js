const deleteAdminSchema = {
  required: ['username', 'contest_id', 'adminname'],
  properties: {
    username: { type: 'string' },
    contest_id: { type: 'number' },
    adminname: { type: 'string' }
  },
  errorMessage: {
    required: {
      username: 'Username required',
      contest_id: 'Contest id required',
      adminname: 'Name of admin to be deleted is required'
    },
    properties: {
      username: 'Invalid username',
      contest_id: 'Invalid contest id',
      adminname: 'Invalid name of admin'
    },
    _: 'Invalid data'
  }
};

module.exports = deleteAdminSchema;
