const { pool } = require('../db');
const { email } = require('../../utils');
const otplib = require('otplib');

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
  semester
}) {
  return new Promise((resolve, reject) => {
    const secret = otplib.authenticator.generateSecret();
    const otp = otplib.authenticator.generate(secret);
    let query = `UPDATE users SET `;
    const arr = [];
    let needsChange = true;
    if (name) {
      query += `name=?,`;
      arr.push(name);
    }
    if (branch) {
      query += `branch=?,`;
      arr.push(branch);
    }
    if (department) {
      query += `department=?,`;
      arr.push(department);
    }
    if (admissionNo) {
      query += `admission_no=?,`;
      arr.push(admissionNo);
    }
    if (semester) {
      query += `semester=?,`;
      arr.push(semester);
    }
    if (emailId) {
      needsChange = false;
      query += `otp=?,otp_valid_upto=NOW()+INTERVAL 1 DAY `;
      arr.push(otp);
    }
    if (needsChange) {
      query = query.slice(0, -1);
    }
    query += ` WHERE username=?`;
    arr.push(username);
    pool.query(query, arr, error => {
      if (error) {
        return reject(error);
      }
      if (emailId) {
        const subject = 'Email verification';
        const PORT = process.env.PORT || 5000;
        const html = `<p>Hello ${username} !</p>
                    <p>The OTP for verifying your new email is ${otp}</p>
                    <p>Please verify your email by visiting the following link</p>
                    <a href='http://${process.env.HOST_NAME}:${PORT}/auth/verify_new_email?email_id=${emailId}&username=${username}'>Verify your email</a>`;
        email(emailId, subject, html);
        return resolve('User info updated. Please verify your email');
      } else {
        return resolve('User info updated');
      }
    });
  });
}

module.exports = updateUser;
