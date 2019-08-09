const bcrypt = require('bcryptjs');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const {pool} = require('../db');

/**
 *
 * @param {String} username
 * @param {String} password
 * @return {Promise}
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
 * @param {*} param0
 * @param {String} param0.username
 * @param {String} param0.password
 * @return {Promise}
 */
function login({username, password}) {
  return new Promise(async (resolve, reject) => {
    let ans;
    try {
      ans = await isCorrect(username, password);
    } catch (error) {
      return reject(error);
    }
    if (ans) {
      const privateKey = fs.readFileSync('../../rsa_secret');
      jwt.sign({username}, privateKey, (error, accessToken) => {
        if (error) {
          return reject(error);
        }
        return resolve({access_token: accessToken});
      });
    } else {
      return reject('Password incorrect');
    }
  });
}

module.exports = login;
