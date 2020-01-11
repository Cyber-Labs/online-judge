/* eslint-disable no-async-promise-executor */
const bcrypt = require('bcryptjs');
const { pool } = require('../db');
const { email } = require('../../utils');
const otplib = require('otplib');

/**
 *
 * @param {*} param0
 * @param {String} param0.username
 * @param {String} param0.email
 * @param {String} param0.name
 * @param {String} param0.password
 * @param {Number} param0.branch
 * @param {Number} param0.department
 * @param {String} param0.admission_no
 * @param {Number} param0.semester
 * @return {Promise}
 *
 */
function signup({
  username,
  email: emailId,
  name,
  password,
  branch,
  department,
  admission_no: admissionNo,
  semester
}) {
  return new Promise(async (resolve, reject) => {
    bcrypt.genSalt(parseInt(process.env.SALT_ROUNDS), (error, salt) => {
      if (error) {
        return reject(error);
      }
      bcrypt.hash(password, salt, (error, hash) => {
        if (error) {
          return reject(error);
        }
        const secret = otplib.authenticator.generateSecret();
        const otp = otplib.authenticator.generate(secret);
        pool.query(
          `INSERT INTO users (username,name,email,password,branch, 
            department,admission_no,semester,otp,otp_valid_upto) VALUES(?,?,?,?,?,?,?,?,?,NOW()+INTERVAL 1 DAY)`,
          [
            username,
            name,
            emailId,
            hash,
            branch,
            department,
            admissionNo,
            semester,
            otp
          ],
          error => {
            if (error) {
              return reject(error);
            }
            const subject = 'Email verification';
            const PORT = process.env.PORT || 5000;
            const html = `<p>Hello ${name} !</p>
                          <p>The OTP for verifying your email is ${otp}</p>
                          <p>Please verify your email by visiting the following link</p>
                          <a href='http://${process.env.HOST_NAME}:${PORT}/auth/verify_email?username=${username}'>Verify your email</a>`;
            email(emailId, subject, html);
            return resolve(
              'Account created. Please activate your account using the OTP sent to your email address.'
            );
          }
        );
      });
    });
  });
}

module.exports = signup;
