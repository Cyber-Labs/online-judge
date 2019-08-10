const {pool} = require('../db');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const {email} = require('../../utils');

/**
 *
 * @param {*} param0
 * @param {String} param0.username
 * @param {String} param0.email
 * @param {String} param0.name
 * @param {Number} param0.branch
 * @param {Number} param0.department
 * @param {String} param0.admission_no
 * @param {Number} param0.semester
 * @return {Promise}
 *
 */
function updateUser({
  username,
  email: emailId,
  name,
  branch,
  department,
  admission_no: admissionNo,
  semester,
}) {
  return new Promise((resolve, reject) => {
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
        return reject(error);
      }
      if (emailId) {
        const privateKey = fs.readFileSync('../../rsa_secret');
        jwt.sign({username, emailId}, privateKey, (error, accessToken) => {
          if (error) {
            return reject(error);
          }
          let subject = 'Email verification';
          const PORT = process.env.PORT || 5000;
          let html = `<p>Hello ${username} !</p>
                          <p>Please verify your email by visiting the following link</p>
                          <a href='${
  process.env.HOST_NAME
}:${PORT}/auth/verify_email?access_token=${accessToken}'>Verify your email</a>`;
          email(emailId, subject, html);
          return resolve('User info updated. Please verify your email');
        });
      } else {
        return resolve('User info updated');
      }
    });
  });
}

module.exports = updateUser;
