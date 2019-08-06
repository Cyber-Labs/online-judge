const ajv = require('../index');
const signupSchema = require('./signup');
const loginSchema = require('./login');
const editUserSchema = require('./editUser');
const forgotPasswordSchema = require('./forgotPassword');
const updatePasswordSchema = require('./updatePassword');

ajv.addFormat('password', (data) => {
  return data.length >= 8;
});

module.exports = {
  signupSchema,
  loginSchema,
  editUserSchema,
  forgotPasswordSchema,
  updatePasswordSchema,
};
