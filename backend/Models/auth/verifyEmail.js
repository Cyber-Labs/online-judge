const {pool} = require('../db');
const jwt = require('jsonwebtoken');
const fs = require('fs');

/**
 *
 * @param {String} accessToken
 * @return {Promise}
 */
function verifyEmail(accessToken) {
  return new Promise((resolve, reject) => {
    const path = require('path');
    const pubKey = fs.readFileSync(path.resolve('rsa_secret.pub'));
    jwt.verify(accessToken, pubKey, (error, decoded) => {
      if (error) {
        return reject(error);
      }
      let query = `UPDATE users SET verified=? `;
      let arr = [1];
      if (decoded.emailId) {
        query += `email=? `;
        arr.push(decoded.emailId);
      }
      query += `WHERE username=?`;
      arr.push(decoded.username);
      pool.query(query, arr, (error, results) => {
        if (error) {
          return reject(error);
        }
        if (!results) {
          return reject('Account does not exist with this username');
        }
        return resolve(results);
      });
    });
  });
}

module.exports = verifyEmail;
