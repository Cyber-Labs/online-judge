const schema = {
  required: ['password', 'password_confirm', 'username', 'otp'],
  properties: {
    password: { type: 'string', format: 'password' },
    password_confirm: { type: 'string', format: 'password' },
    username: { type: 'string', minLength: 4 },
    otp: { type: 'number', minLength: 6, maxLength: 6 }
  },
  errorMessage: {
    required: {
      password: 'Password required',
      password_confirm: 'Confirm password required',
      username: 'Username required',
      otp: 'OTP required'
    },
    properties: {
      password: 'Invalid data',
      password_confirm: 'Invalid confirm password',
      username: 'Invalid username',
      otp: 'Invalid OTP'
    },
    _: 'Invalid data'
  }
}

module.exports = schema
