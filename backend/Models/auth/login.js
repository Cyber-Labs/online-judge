/* eslint-disable no-async-promise-executor */
const fs = require("fs");
const jwt = require("jsonwebtoken");
const isCorrect = require("./isCorrect");

/**
 *
 * @param {*} param0
 * @param {String} param0.username
 * @param {String} param0.password
 * @return {Promise}
 */
function login({ username, password }) {
  return new Promise(async (resolve, reject) => {
    let ans;
    try {
      ans = await isCorrect(username, password);
    } catch (error) {
      return reject(error);
    }
    if (ans) {
      const path = require("path");
      const privateKey = fs.readFileSync(
        path.resolve("rsa_secret.pub"),
        "utf-8"
      );
      jwt.sign(
        { username },
        privateKey,
        { expiresIn: "720h" },
        (error, accessToken) => {
          if (error) {
            return reject(error);
          }
          return resolve({ username, access_token: accessToken });
        }
      );
    } else {
      return reject("Password incorrect");
    }
  });
}

module.exports = login;
