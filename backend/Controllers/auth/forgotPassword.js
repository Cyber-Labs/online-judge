const {pool} = require('../db');
const {forgotPasswordSchema} = require('../../Schema/auth');
const ajv = require('../../Schema');
const {email} = require('../../utils');
const fs = require('fs');
const jwt = require('jsonwebtoken');

/**
 *
 * @param {*} username
 * @param {*} email
 * @return {Boolean}
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
 * @param {*} req
 * @param {*} res
 * @return {*}
 */
async function forgotPassword(req, res) {
  const validate = ajv(forgotPasswordSchema);
  const valid = validate(req.body);
  if (!valid) {
    return res.status(400).json({
      success: false,
      error: validate.errors,
      results: null,
    });
  }
  const {username, email: emailId} = req.body;
  let ans;
  try {
    ans = await isCorrect(username, emailId);
  } catch (error) {
    return res.status(400).json({
      success: false,
      error,
      results: null,
    });
  }
  if (ans) {
    const privateKey = fs.readFileSync('../../rsa_secret');
    jwt.sign({username}, privateKey, (error, accessToken) => {
      if (error) {
        return res.status(501).json({
          success: false,
          error,
          results: null,
        });
      }
      let subject = 'Forgot Password';
      const PORT = process.env.PORT || 5000;
      let html = `<p>Hello ${username} !</p>
                          <p>Please reset your password by visiting the following link</p>
                          <a href='${
  process.env.HOST_NAME
}:${PORT}/auth/reset_password?access_token=${accessToken}'>Reset password</a>`;
      email(emailId, subject, html);
      return res.status(200).json({
        success: true,
        error: null,
        results: 'Please reset your password from the email received',
      });
    });
  } else {
    return res.status(401).json({
      success: false,
      error: 'Email not linked to the username',
      results: null,
    });
  }
}

module.exports = forgotPassword;
