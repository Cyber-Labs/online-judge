const {pool} = require('../db');
const jwt = require('jsonwebtoken');
const fs = require('fs');

const verifyEmail = (req, res) => {
  const accessToken = req.params.access_token;
  const pubKey = fs.readFileSync('../../rsa_secret.pub');
  jwt.verify(accessToken, pubKey, (error, decoded) => {
    if (error) {
      return res.status(400).json({
        success: false,
        error,
        results: null,
      });
    }
    pool.query(
        `UPDATE users SET verified=? WHERE username=?`,
        [1, decoded.username],
        (error, results) => {
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
        }
    );
  });
};

module.exports = verifyEmail;
