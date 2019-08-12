const {pool} = require('../db');
/**
  * @param {Object} param0
  * @param {String} param0.username
 ` *@param {String} param0.name
  * @param {String} param0.description
  * @param {Number} param0.confidential
  * @param {String} param0.branch
  * @param {String} param0.semester
  * @return {Promise}
  */
 function customGroup(
    username,
    name,
    description,
    confidential,
    branch,
    semester
  ) {
    return new Promise(async (resolve, reject) => {
        pool.getConnection(function(error, connection) {
            if (error) {
              reject(error);
            }
            connection.beginTransaction(function(error) {
              if (error) {
                reject(error);
              }
              connection.query(
                  `INSERT INTO groups(name,description,confidential,created_by) VALUES (?,?,?,?) WHERE
                  (SELECT COUNT(username) FROM users WHERE (username=? AND admin=1) `,
                [
                  name,
                  description,
                  confidential,
                  username,
                  username,
                ],
                async (error, results, fields) => {
                  if (error) {
                  reject(error);
                    connection.rollback(function(error) {
                      connection.release();
                    });
                return;
                }
                let xy = new Promise(function(resolve, reject) {
                    connection.query(
                      "INSERT INTO UserGroups(`username`,`group_id`,`admin`)" +
                        "VALUES(?,?,?)",
                      [
                          username,
                          results.insertId,
                          1,                      
                      ],
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
              let insertion = new Promise(function(resolve, reject) {
                connection.query(
                  `INSERT INTO UserGroups(username,group_id)
                    SELECT username AS u.username , group_id AS g.id , u.branch , u.semester
                    FROM
                    users u, groups g
                    WHERE
                    u.branch = ? , u.semester = ? AND g.name = ?
                     `,
                  [
                      branch,
                      semester,
                      name,                      
                  ],
                  (error, results, fields) => {
                    if (error) {
                      reject(error);
                      return;
                    }
                  }
                );
              });
              try {
                await insertion;
              } catch (e) {
                connection.rollback(function(error) {
                  connection.release();
                  reject(e);
                });
                error2 = true;
              }
             if (error2) {
              return;
            }
              connection.commit(function(error) {
                connection.release();
                if (error) {
                  reject(error);
                  return;
                }
                resolve({ id: idProduct });
              });
            }
          );
        });
      });
    });
  }
  module.exports = customGroup;