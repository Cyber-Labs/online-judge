const fs = require('fs');
const jwt = require('jsonwebtoken');

/**
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
function verifyAccessToken(req, res, next) {
  if (req.headers.access_token) {
    const pubKey = fs.readFileSync('../../rsa_secret.pub');
    jwt.verify(req.headers.access_token, pubKey, (error, decoded) => {
      if (error) {
        res.status(401).json({
          success: false,
          error,
          results: null,
        });
        return;
      }
      req.body.username = decoded.username;
      next();
    });
  } else {
    res.status(401).json({
      success: false,
      error: 'Access code not included in the header of the request',
      results: null,
    });
    return;
  }
}

module.exports = {verifyAccessToken};
