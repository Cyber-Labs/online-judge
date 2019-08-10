const bcrypt = require('bcryptjs');
const {pool} = require('../db');
const {email} = require('../../utils');
const jwt = require('jsonwebtoken');
const fs = require('fs');
/**
 *
 * @param {String} username
 * @return {Promise}
 */
function isUsed(username) {
  return new Promise((resolve, reject) => {
    pool.query(
        `SELECT COUNT(name) AS count FROM users WHERE username=?`,
        [username],
        (error, results) => {
          if (error) {
            return reject(error);
          }
          return resolve(Boolean(results[0].count));
        }
    );
  });
}

/**
 *
 * @param {String} admissionNo
 * @return {Promise}
 */
function isExist(admissionNo) {
  return new Promise((resolve, reject) => {
    pool.query(
        `SELECT COUNT(name) AS count FROM users WHERE admission_no=?`,
        [admissionNo],
        (error, results) => {
          if (error) {
            return reject(error);
          }
          return resolve(Boolean(results[0].count));
        }
    );
  });
}

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
  semester,
}) {
  return new Promise(async (resolve, reject) => {
    let ans;
    try {
      ans = await isUsed(username);
    } catch (error) {
      return reject(error);
    }
    if (ans) {
      return reject('Username already taken');
    } else {
      let ans;
      try {
        ans = await isExist(admissionNo);
      } catch (error) {
        return reject(error);
      }
      if (ans) {
        return reject('An account already exists with the admission number');
      }
      bcrypt.genSalt(parseInt(process.env.SALT_ROUNDS), (error, salt) => {
        if (error) {
          return reject(error);
        }
        bcrypt.hash(password, salt, (error, hash) => {
          if (error) {
            return reject(error);
          }
          pool.query(
              `INSERT INTO users (username,name,email,password,branch, 
              department,admission_no,semester) VALUES(?,?,?,?,?,?,?,?)`,
              [
                username,
                name,
                emailId,
                hash,
                branch,
                department,
                admissionNo,
                semester,
              ],
              (error, results) => {
                if (error) {
                  return reject(error);
                }
                resolve(
                    'Account created. Please activate account from the email received'
                );
                const path = require('path');
                const privateKey = fs.readFileSync(
                    path.resolve('rsa_secret.pub'),
                    'utf-8'
                );
                jwt.sign({username}, privateKey, (error, accessToken) => {
                  if (error) {
                    return reject(error);
                  }
                  let subject = 'Email verification';
                  const PORT = process.env.PORT || 5000;
                  let html = `<p>Hello ${name} !</p>
                          <p>Please verify your email by visiting the following link</p>
                          <a href='http://${
  process.env.HOST_NAME
}:${PORT}/auth/verify_email?access_token=${accessToken}'>Verify your email</a>`;
                  email(emailId, subject, html);
                  return;
                });
              }
          );
        });
      });
    }
  });
}

module.exports = signup;
