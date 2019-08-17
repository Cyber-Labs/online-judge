/* eslint-disable no-async-promise-executor */
const { pool } = require('../db')
const bcrypt = require('bcryptjs')
const isCorrect = require('./isCorrect')

/**
 *
 * @param {*} param0
 * @param {String} param0.username
 * @param {String} param0.password
 * @param {String} param0.new_password
 * @return {Promise}
 */
function updatePassword ({ username, password, new_password: newPassword }) {
  return new Promise(async (resolve, reject) => {
    let ans
    try {
      ans = await isCorrect(username, password)
    } catch (error) {
      return reject(error)
    }
    if (ans) {
      bcrypt.genSalt(parseInt(process.env.SALT_ROUNDS), (error, salt) => {
        if (error) {
          return reject(error)
        }
        bcrypt.hash(newPassword, salt, (error, hash) => {
          if (error) {
            return reject(error)
          }
          pool.query(
            `UPDATE users SET password=? WHERE username=?`,
            [hash, username],
            error => {
              if (error) {
                return reject(error)
              }
              return resolve('Password updated')
            }
          )
        })
      })
    } else {
      return reject('Password incorrect')
    }
  })
}

module.exports = updatePassword
