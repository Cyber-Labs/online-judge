const schema = {
  required: ['otp', 'email', 'username'],
  properties: {
    otp: { type: 'number', minLength: 6, maxLength: 6 },
    username: { type: 'string', minLength: 4 },
    email: {
      type: 'string',
      pattern:
        '^[a-z]+\\.[0-9]{2}[a-z]{2}[0-9]{4}@([a-z].\\.)?iitism\\.ac\\.in$'
    }
  },
  errorMessage: {
    required: {
      otp: 'OTP required',
      username: 'username or email required',
      email: 'email or username required'
    },
    properties: {
      otp: 'Invalid OTP',
      username: 'Invalid username',
      email: 'Invalid email'
    },
    _: 'Invalid data'
  }
}

module.exports = schema
