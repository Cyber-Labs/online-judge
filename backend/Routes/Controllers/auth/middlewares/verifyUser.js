const fs = require('fs');
const jwt = require('jsonwebtoken');

/**
 * @typedef {import { Request } from "express";} Request
 * @typedef {import { Response } from "express";} Response
 * @typedef {import { next } from "express";} Next
 */

/**
 *
 * @param {Request} req
 * @param {Response} res
 * @param {Next} next
 */
function verifyAccessToken(req, res, next) {
  if (req.headers.access_token) {
    const path = require('path');
    const pubKey = fs.readFileSync(path.resolve('rsa_secret.pub'), 'utf-8');
    jwt.verify(req.headers.access_token, pubKey, (error, decoded) => {
      if (error) {
        res.status(401).json({
          success: false,
          error,
          results: null
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
      results: null
    });
  }
}

module.exports = { verifyAccessToken };
