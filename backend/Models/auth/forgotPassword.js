/* eslint-disable no-async-promise-executor */
const { email } = require('../../utils');
const otplib = require('otplib');
const { pool } = require('../db');

/**
 *
 * @param {*} param0
 * @param {String} param0.email
 * @return {Promise}
 */
function forgotPassword({ email: emailId }) {
  return new Promise(async (resolve, reject) => {
    const secret = otplib.authenticator.generateSecret();
    const otp = otplib.authenticator.generate(secret);
    const subject = 'Forgot Password';
    const PORT = process.env.PORT || 5000;
    const html = `<p>Hello !</p>
                <p>The otp for resetting your password is ${otp}</p>
                <p>Please reset your password by visiting the following link</p>
                <a href='http://${process.env.HOST_NAME}:${PORT}/auth/reset_password'>Reset password</a>`;
    email(emailId, subject, html);
    pool.query(
      `UPDATE users SET otp=?,otp_valid_upto=NOW()+INTERVAL 1 DAY WHERE email=?`,
      [otp, emailId],
      error => {
        if (error) {
          return reject(error);
        }
        return resolve('Please reset your password from the email received');
      }
    );
  });
}

module.exports = forgotPassword;
