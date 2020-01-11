const ajv = require('../index');
const signupSchema = require('./signup');
const loginSchema = require('./login');
const updateUserSchema = require('./updateUser');
const forgotPasswordSchema = require('./forgotPassword');
const updatePasswordSchema = require('./updatePassword');
const resetPasswordSchema = require('./resetPassword');
const verifyEmailSchema = require('./verifyEmail');
const verifyNewEmailSchema = require('./verifyNewEmail');

ajv.addFormat('password', data => {
  return data.length >= 8;
});

module.exports = {
  signupSchema,
  loginSchema,
  updateUserSchema,
  forgotPasswordSchema,
  updatePasswordSchema,
  resetPasswordSchema,
  verifyEmailSchema,
  verifyNewEmailSchema
};
