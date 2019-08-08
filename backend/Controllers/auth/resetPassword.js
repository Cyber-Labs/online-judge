const bcrypt = require('bcryptjs');
const {pool} = require('../db');
const ajv = require('../../Schema');
const {resetPasswordSchema} = require('../../Schema/auth');

/**
 *
 * @param {*} req
 * @param {*} res
 * @return {*}
 */
function resetPassword(req, res) {
  const validate = ajv.compile(resetPasswordSchema);
  const valid = validate(req.body);
  if (!valid) {
    return res.status(400).json({
      success: false,
      error: validate.errors,
      results: null,
    });
  }
  const {password, password_confirm: passwordConfirm, username} = req.body;
  if (password !== passwordConfirm) {
    return res.status(400).json({
      success: false,
      error: 'Two passwords are not equal',
      results: null,
    });
  }
  bcrypt.genSalt(process.env.SALT_ROUNDS, (error, salt) => {
    if (error) {
      return res.status(501).json({
        success: false,
        error,
        results: null,
      });
    }
    bcrypt.hash(password, salt, (error, hash) => {
      if (error) {
        return res.status(501).json({
          success: false,
          error,
          results: null,
        });
      }
      pool.query(
          `UPDATE users SET password=? WHERE username=?`,
          [hash, username],
          (error, results) => {
            if (error) {
              return res.status(400).json({
                success: false,
                error,
                results: null,
              });
            }
            return res.status(200).json({
              success: true,
              error: null,
              results,
            });
          }
      );
    });
  });
}

module.exports = resetPassword;
