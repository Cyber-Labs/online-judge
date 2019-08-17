const schema = {
  required: ['username', 'password'],
  properties: {
    username: { type: 'string', minLength: 4 },
    password: { type: 'string', format: 'password' }
  },
  errorMessage: {
    required: {
      username: 'Username required',
      password: 'Password required'
    },
    properties: {
      username: 'Invalid username',
      password: 'Invalid password'
    },
    _: 'Invalid data'
  }
}

module.exports = schema
