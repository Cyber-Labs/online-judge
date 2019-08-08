const bcrypt = require('bcryptjs');
const {pool} = require('../db');
const email = require('../../utils/email');
const ajv = require('../../Schema');
const {signupSchema} = require('../../Schema/auth');
const jwt = require('jsonwebtoken');
const fs = require('fs');

const isUsed = (username) => {
  return new Promise((resolve, reject) => {
    pool.query(
        `SELECT COUNT(name) AS count FROM users WHERE username=?`,
        [username],
        (error, results) => {
          if (error) {
            return reject(error);
          }
          return resolve(Boolean(results.count));
        }
    );
  });
};

const isExist = (admissionNo) => {
  return new Promise((resolve, reject) => {
    pool.query(
        `SELECT COUNT(name) AS count FROM users WHERE admission_no=?`,
        [admissionNo],
        (error, results) => {
          if (error) {
            return reject(error);
          }
          return resolve(Boolean(results.count));
        }
    );
  });
};

const signup = async (req, res) => {
  let validate = ajv.compile(signupSchema);
  let valid = validate(req.body);
  if (!valid) {
    return res.status(400).json({
      success: false,
      error: valid.errors,
      results: null,
    });
  }
  const {
    username,
    emailId,
    name,
    password,
    branch,
    department,
    admission_no: admissionNo,
    semester,
  } = req.body;
  let ans;
  try {
    ans = await isUsed(username);
  } catch (error) {
    return res.status(400).json({
      success: false,
      error,
      results: null,
    });
  }
  if (ans) {
    return res.status(400).json({
      success: false,
      error: 'Username already taken',
      results: null,
    });
  } else {
    let ans;
    try {
      ans = await isExist(admissionNo);
    } catch (error) {
      return res.status(400).json({
        success: false,
        error,
        results: null,
      });
    }
    if (ans) {
      return res.status(400).json({
        success: false,
        error: 'An account already exists with the admission number',
        results: null,
      });
    }
    bcrypt.genSalt(process.env.SALT_ROUNDS, (error, salt) => {
      if (error) {
        return res.status(400).json({
          success: false,
          error,
          results: null,
        });
      }
      bcrypt.hash(password, salt, (error, hash) => {
        if (error) {
          return res.status(400).json({
            success: false,
            error,
            results: null,
          });
        }
        pool.query(
            `INSERT INTO users ("username", "name", "email", "password", "branch", 
            "department", "admission_no", "semester") VALUES(?,?,?,?,?,?,?,?)`,
            [
              username,
              name,
              emailId,
              hash,
              branch,
              department,
              admissionNo,
              semester,
            ],
            (error, results) => {
              if (error) {
                return res.status(400).json({
                  success: false,
                  error,
                  results: null,
                });
              }
              const privateKey = fs.readFileSync('../../rsa_secret');
              jwt.sign({username}, privateKey, (error, accessToken) => {
                if (error) {
                  return res.status(501).json({
                    success: false,
                    error,
                    results: null,
                  });
                }
                let subject = 'Email verification';
                const PORT = process.env.PORT || 5000;
                let html = `<p>Hello ${name} !</p>
                          <p>Please verify your account by visiting the following link</p>
                          <a href='${
  process.env.HOST_NAME
}:${PORT}/auth/verify_email?access_token=${accessToken}'>Verify your email</a>`;
                email(emailId, subject, html);
                return res.status(200).json({
                  success: true,
                  error: null,
                  results:
                  'Account created. Please activate account from the email received',
                });
              });
            }
        );
      });
    });
  }
};

module.exports = signup;
