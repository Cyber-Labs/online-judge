const schema = {
  required: ['email'],
  properties: {
    email: {
      type: 'string',
      pattern:
        '^[a-z]+\\.[0-9]{2}[a-z]{2}[0-9]{4}@([a-z].\\.)?iitism\\.ac\\.in$'
    },
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
