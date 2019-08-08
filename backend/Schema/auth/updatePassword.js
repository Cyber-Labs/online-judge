let schema = {
  required: ['password', 'username', 'new_password'],
  properties: {
    username: {type: 'string'},
    password: {type: 'string', format: 'password'},
    new_password: {type: 'string', format: 'password'},
  },
  errorMessage: {
    required: {
      username: 'Username requried',
      password: 'Current Password required',
      new_password: 'New password required',
    },
    properties: {
      username: 'Invalid username',
      password: 'Invalid password',
      new_password: 'Invalid new Password',
    },
    _: 'Invalid data',
  },
};

module.exports = schema;
