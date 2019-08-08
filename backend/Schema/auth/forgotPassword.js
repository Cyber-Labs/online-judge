const schema = {
  required: ['email'],
  properties: {
    email: {type: 'string', format: 'email'},
  },
  errorMessage: {
    required: {
      email: 'Email required',
    },
    properties: {
      email: 'Invalid email',
    },
    _: 'Invalid data',
  },
};

module.exports = schema;
