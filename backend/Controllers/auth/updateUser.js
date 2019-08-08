const {pool} = require('../db');
const ajv = require('../../Schema');
const {updateUserSchema} = require('../../Schema/auth');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const {email} = require('../../utils');

/**
 *
 * @param {*} req
 * @param {*} res
 * @return {*}
 */
function updateUser(req, res) {
  const validate = ajv.compile(updateUserSchema);
  const valid = validate(req.body);
  if (!valid) {
    return res.status(400).json({
      success: false,
      error: validate.errors,
      results: null,
    });
  }
  const {
    username,
    email: emailId,
    name,
    branch,
    department,
    admission_no: admissionNo,
    semester,
  } = req.body;
  let query = `UPDATE users SET `;
  let arr = [];
  if (name) {
    query += `name=? `;
    arr.push(name);
  }
  if (branch) {
    query += `branch=? `;
    arr.push(branch);
  }
  if (department) {
    query += `department=? `;
    arr.push(department);
  }
  if (admissionNo) {
    query += `admission_no=? `;
    arr.push(admissionNo);
  }
  if (semester) {
    query += `semester=? `;
    arr.push(semester);
  }
  query += `WHERE username=?`;
  arr.push(username);
  pool.query(query, arr, (error, results) => {
    if (error) {
      return res.status(400).json({
        success: false,
        error,
        results: null,
      });
    }
    if (emailId) {
      const privateKey = fs.readFileSync('../../rsa_secret');
      jwt.sign({username, emailId}, privateKey, (error, accessToken) => {
        if (error) {
          return res.status(501).json({
            success: false,
            error,
            results: null,
          });
        }
        let subject = 'Email verification';
        const PORT = process.env.PORT || 5000;
        let html = `<p>Hello ${username} !</p>
                          <p>Please verify your email by visiting the following link</p>
                          <a href='${
  process.env.HOST_NAME
}:${PORT}/auth/verify_email?access_token=${accessToken}'>Verify your email</a>`;
        email(emailId, subject, html);
        return res.status(200).json({
          success: true,
          error: null,
          results: 'User info updated. Please verify your email',
        });
      });
    } else {
      return res.status(200).json({
        success: true,
        error: null,
        results: 'User info updated',
      });
    }
  });
}

module.exports = updateUser;
