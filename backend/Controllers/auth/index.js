const login = require('./login');
const signup = require('./signup');
const updatePassword = require('./updatePassword');
const forgotPassword = require('./forgotPassword');
const verifyUser = require('./verifyUser');
const getUser = require('./getUser');
const updateUser = require('./updateUser');
const verifyEmail = require('./verifyEmail');

module.exports = {
  login,
  signup,
  updatePassword,
  forgotPassword,
  verifyUser,
  getUser,
  updateUser,
  verifyEmail,
};
