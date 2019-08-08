const {pool} = require('../db');

/**
 *
 * @param {*} req
 * @param {*} res
 */
function getUser(req, res) {
  const username = req.params.username;
  pool.query(
      `SELECT * FROM users WHERE username=?`,
      [username],
      (error, results) => {
        if (error) {
          return res.status(404).json({
            success: false,
            error: 'User not found',
            results: null,
          });
        }
        return res.status(200).json({
          success: false,
          error: null,
          results,
        });
      }
  );
}

module.exports = getUser;
