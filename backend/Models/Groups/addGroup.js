const { pool } = require("../db");
/**
 *
 * @param {Object} param0
 * @param {String} param0.username
 * @param {String} param0.name
 * @param {String} param0.description
 * @param {String} param0.confidential
 * @return {Promise}
 */

function addGroup({ username, name, description, confidential }) {
  return new Promise(async (resolve, reject) => {
    pool.getConnection(function(error, connection) {
      if (error) {
        return reject(error);
      }
      connection.beginTransaction(function(error) {
        if (error) {
          return reject(error);
        }
        connection.query(
          `INSERT INTO groups(name,description,confidential,created_by) VALUES (?,?,?,?) WHERE
            (SELECT COUNT(username) FROM users WHERE (username=? AND admin=1) `,
          [name, description, confidential, username, username],
          async (error, results, fields) => {
            if (error) {
              connection.rollback(function(error) {
                connection.release();
              });
              return reject(error);
            }
            let xy = new Promise(function(resolve, reject) {
              connection.query(
                "INSERT INTO UserGroups(`username`,`group_id`,`admin`)" +
                  "VALUES(?,?,?)",
                [username, results.insertId, 1],
                (error, results, fields) => {
                  if (error) {
                    reject(error);
                    return;
                  }
                }
              );
            });
            try {
              await xy;
            } catch (e) {
              connection.rollback(function(error) {
                connection.release();
                reject(e);
              });
              error1 = true;
            }
            if (error1) {
              return;
            }
            connection.commit(function(error, results) {
              connection.release();
              if (error) {
                reject(error);
                return;
              }
              resolve(results);
            });
          }
        );
      });
    });
  });
}
module.exports = addGroup;
