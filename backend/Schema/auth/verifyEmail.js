const schema = {
  required: ['otp', 'username'],
  properties: {
    otp: { type: 'number', minLength: 6, maxLength: 6 },
    username: { type: 'string', minLength: 4 }
  },
  errorMessage: {
    required: {
      otp: 'OTP required',
      username: 'username or email required'
    },
    properties: {
      otp: 'Invalid OTP',
      username: 'Invalid username'
    },
    _: 'Invalid data'
  }
}

module.exports = schema
