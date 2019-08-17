const schema = {
  required: ['password', 'new_password'],
  properties: {
    password: { type: 'string', format: 'password' },
    new_password: { type: 'string', format: 'password' }
  },
  errorMessage: {
    required: {
      password: 'Current Password required',
      new_password: 'New password required'
    },
    properties: {
      password: 'Invalid password',
      new_password: 'Invalid new Password'
    },
    _: 'Invalid data'
  }
};

module.exports = schema;
