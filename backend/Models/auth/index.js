const login = require("./login");
const signup = require("./signup");
const updatePassword = require("./updatePassword");
const forgotPassword = require("./forgotPassword");
const getUser = require("./getUser");
const updateUser = require("./updateUser");
const verifyEmail = require("./verifyEmail");
const resetPassword = require("./resetPassword");
const verifyNewEmail = require("./verifyNewEmail");

module.exports = {
  login,
  signup,
  updatePassword,
  forgotPassword,
  updateUser,
  getUser,
  verifyEmail,
  resetPassword,
  verifyNewEmail
};
