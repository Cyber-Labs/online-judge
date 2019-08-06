const bcrypt = require('bcryptjs');
const {pool} = require('../db');
const email = require('../../utils/email');
const ajv = require('../../Schema');
const {signupSchema} = require('../../Schema/auth');

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
  if (await isUsed(username)) {
    return res.status(400).json({
      success: false,
      error: 'Username already taken',
      results: null,
    });
  } else {
    if (await isExist(admissionNo)) {
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
              email(emailId, name);
              return res.status(200).json({
                success: true,
                error: null,
                results:
                'Account created. Please activate account from the email received',
              });
            }
        );
      });
    });
  }
};

module.exports = signup;
