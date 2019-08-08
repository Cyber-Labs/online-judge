const bcrypt = require('bcryptjs');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const {pool} = require('../db');
const ajv = require('../../Schema');
const {loginSchema} = require('../../Schema/auth');

const isCorrect = (username, password) => {
  return new Promise((resolve, reject) => {
    pool.query(
        `SELECT password FROM users WHERE username=? AND verified!=?`,
        [username, 0],
        (error, results) => {
          if (error) {
            return reject(error);
          }
          if (!results) {
            return reject('Account does not exist or email not verified');
          }
          bcrypt.compare(password, results.password, (error, res) => {
            if (error) {
              return reject(error);
            }

            if (!res) {
              return resolve(false);
            } else {
              return resolve(true);
            }
          });
        }
    );
  });
};

const login = async (req, res) => {
  const validate = ajv.compile(loginSchema);
  const valid = validate(req.body);

  if (!valid) {
    return res.status(400).json({
      success: false,
      error: validate.errors,
      results: null,
    });
  }

  const {username, password} = req.body;
  let ans;
  try {
    ans = await isCorrect(username, password);
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
        return res.status(503).json({
          success: false,
          error: 'Service unavailable',
          results: null,
        });
      }
      return res.status(200).json({
        success: true,
        error: null,
        results: {access_token: accessToken},
      });
    });
  } else {
    return res.status(401).json({
      success: false,
      error: 'Password incorrect',
      results: null,
    });
  }
};

module.exports = login;
