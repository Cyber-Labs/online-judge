const schema = {
  required: ['password', 'password_confirm'],
  properties: {
    password: {type: 'string', format: 'password'},
    password_confirm: {type: 'string', format: 'password'},
  },
  errorMessage: {
    required: {
      password: 'Password required',
      password_confirm: 'Confirm password required',
    },
    properties: {
      password: 'Invalid data',
      password_confirm: 'Invalid confirm password',
    },
    _: 'Invalid data',
  },
};

module.exports = schema;
