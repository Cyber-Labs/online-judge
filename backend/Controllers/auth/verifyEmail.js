const {pool} = require('../db');
const jwt = require('jsonwebtoken');
const fs = require('fs');

/**
 *
 * @param {*} req
 * @param {*} res
 * @return {*}
 */
function verifyEmail(req, res) {
  const accessToken = req.query.access_token;
  if (!accessToken) {
    return res.status(400).json({
      success: false,
      error: 'Access token required',
      results: null,
    });
  }
  const pubKey = fs.readFileSync('../../rsa_secret.pub');
  jwt.verify(accessToken, pubKey, (error, decoded) => {
    if (error) {
      return res.status(400).json({
        success: false,
        error,
        results: null,
      });
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
        return res.status(400).json({
          success: false,
          error,
          results: null,
        });
      }
      if (!results) {
        return res.status(400).json({
          success: false,
          error: 'Account does not exist with this username',
          results: null,
        });
      }
      return res.status(200).json({
        success: true,
        error: null,
        results: null,
      });
    });
  });
}

module.exports = verifyEmail;
