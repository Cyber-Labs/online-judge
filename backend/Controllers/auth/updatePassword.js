const {pool} = require('../db');
const bcrypt = require('bcryptjs');
const ajv = require('../../Schema');
const {updatePasswordSchema} = require('../../Schema/auth');

/**
 *
 * @param {*} username
 * @param {*} password
 * @return {Boolean}
 */
function isCorrect(username, password) {
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
}

/**
 *
 * @param {*} req
 * @param {*} res
 */
async function updatePassword(req, res) {
  const validate = ajv.compile(updatePasswordSchema);
  const valid = validate(req.body);
  if (!valid) {
    return res.status(400).json({
      success: false,
      error: validate.errors,
      results: null,
    });
  }
  const {username, password, new_password: newPassword} = req.body;
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
    bcrypt.genSalt(process.env.SALT_ROUNDS, (error, salt) => {
      if (error) {
        return res.status(500).json({
          success: false,
          error,
          results: null,
        });
      }
      bcrypt.hash(newPassword, salt, (error, hash) => {
        if (error) {
          return res.status(500).json({
            success: false,
            error,
            results: null,
          });
        }
        pool.query(
            `UPDATE users SET password=? WHERE username=?`,
            [hash, username],
            (error, results) => {
              if (error) {
                return res.status(400).json({
                  success: false,
                  error,
                  results: null,
                });
              }
              return res.status(400).json({
                success: true,
                error: null,
                results: 'Password updated',
              });
            }
        );
      });
    });
  } else {
    return res.status(401).json({
      success: false,
      error: 'Password incorrect',
      results: null,
    });
  }
}

module.exports = updatePassword;
