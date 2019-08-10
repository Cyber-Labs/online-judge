const {pool} = require('../db');
const {email} = require('../../utils');
const fs = require('fs');
const jwt = require('jsonwebtoken');

/**
 *
 * @param {String} username
 * @param {String} email
 * @return {Promise}
 */
function isCorrect(username, email) {
  return new Promise((resolve, reject) => {
    pool.query(
        `SELECT email FROM users WHERE username=?`,
        [username],
        (error, results) => {
          if (error) {
            return reject(error);
          }
          if (!results) {
            return reject('Account does not exist');
          }
          return resolve(Boolean(results.email == email));
        }
    );
  });
}

/**
 *
 * @param {*} param0
 * @param {String} param0.username
 * @param {String} param0.email
 * @return {Promise}
 */
function forgotPassword({username, email: emailId}) {
  return new Promise(async (resolve, reject) => {
    let ans;
    try {
      ans = await isCorrect(username, emailId);
    } catch (error) {
      return reject(error);
    }
    if (ans) {
      const privateKey = fs.readFileSync('../../rsa_secret');
      jwt.sign({username}, privateKey, (error, accessToken) => {
        if (error) {
          return reject(error);
        }
        let subject = 'Forgot Password';
        const PORT = process.env.PORT || 5000;
        let html = `<p>Hello ${username} !</p>
                          <p>Please reset your password by visiting the following link</p>
                          <a href='${
  process.env.HOST_NAME
}:${PORT}/auth/reset_password?access_token=${accessToken}'>Reset password</a>`;
        email(emailId, subject, html);
        return resolve('Please reset your password from the email received');
      });
    } else {
      return reject('Email not linked to the username');
    }
  });
}

module.exports = forgotPassword;
