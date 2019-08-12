const {pool} = require('../db');
var groupModel = {
   getAllGroups:getAllGroups,
   getAllGroupsOfUser:getAllGroupsOfUser,
   addGroup:addGroup,
   updateGroup:updateGroup,
   deleteGroup:deleteGroup,
   getGroupById:getGroupById,
   addUserToGroup:addUserToGroup,
   makeUserAdmin : makeUserAdmin,
   customGroup : customGroup,
}
/**
 *
 * @param {Object} param0
 * @param {String} param0.username
 * @param {String} param0.name
 * @param {String} param0.description
 * @param {String} param0.confidential
 * @return {Promise}
 */

function addGroup(
  {
  username,
  name,
  description,
  confidential
}
) {
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
        [
          name,
          description,
          confidential,
          username,
          username,
        ],
        (error, results, fields) => {
          if (error) {
            connection.rollback(function(error) {
              connection.release();
            });
            return reject(error);
          }
          let xy = new Promise(function(resolve, reject) {
              connection.query(
                "INSERT INTO UserGroups(`username`,`group_id`,`admin`)" +
                  "VALUES(?,SELECT id FROM groups WHERE name = ?,?)",
                [
                    username,
                    name,
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
          connection.commit(function(error , results) {
            connection.release();
            if (error) {
              reject(error);
              return;
            }
            resolve({results});
          });
        }
      );
    });
  });
});
}
/**
 *
 * @param {Object} param0
 * @param {String} param0.username
 * @return {Promise}
 */

function getAllGroupsOfUser({
    username : username,
}) {
    return new Promise(function(resolve, reject) {
        pool.query(`SELECT * FROM  UserGroups uG INNER JOIN groups g ON g.id = uG.group_id WHERE username = ? AND confidential = 0`,
      [
        username,
      ],
          function(error, results) {
            if (error) {
              reject(error);
              return;
            }
            resolve(results);
          }
        );
      });
}
/**
 *
 * @param {Object} param0
 * @param {String} param0.username
 * @return {Promise}
 */

function getAllGroups({
    username : username,
}) {
    return new Promise((resolve,reject) => {
        pool.query(`SELECT * FROM groups WHERE (SELECT COUNT(username) FROM users WHERE (username=? AND admin=1))`,
        [
            username
        ],function(error, results) {
            if (error) {
              reject(error);
              return;
            }
            resolve(results);
          }
        );
      });
}
/**
 *
 * @param {Object} param0
 * @param {String} param0.username
 * @param {Number} param0.group_id
 * @return {Promise}
 */

function getGroupById({
    username,
    group_id:group_id, 
    }) {
        return new Promise((resolve,reject) => {
            pool.query(`SELECT * FROM groups WHERE id = ? AND (SELECT COUNT(username) FROM UserGroups WHERE (username=? AND group_id=?))`,
            [
                group_id,
                username,
                group_id,

            ],function(error, results) {
                if (error) {
                  reject(error);
                  return;
                }
                resolve(results);
              }
            );
          });
    }
/**
 *
 * @param {Object} param0
 * @param {String} param0.username
 * @param {String} param0.description
 * @param {Number} param0.group_id
 * @return {Promise}
 */
function updateGroup({
    username,
    group_id:group_id,
    description : description,
}) {
    
        return new Promise((resolve,reject) => {
            pool.query(`UPDATE groups SET description=? WHERE
            (SELECT COUNT(username) FROM UserGroups WHERE (username=? AND admin=1 AND group_id = ?))`,
            [
                description,
                username,
                group_id,

            ],function(error, results) {
                if (error) {
                  reject(error);
                  return;
                }
                resolve(results);
              }
            );
          });
}
/**
 *
 * @param {Object} param0
 * @param {String} param0.username
 * @param {Number} param0.group_id
 * @return {Promise}
 */
function deleteGroup({
    username,
    group_id : group_id,
}) {
   return new Promise((resolve,reject) => {
    pool.query(`DELETE FROM groups WHERE id = ? AND
    (SELECT COUNT(username) FROM UserGroups WHERE (username=? AND admin=1 AND group_id = ?))`,
    [
        group_id,
        username,
        group_id,

    ],function(error, results) {
        if (error) {
          reject(error);
          return;
        }
        resolve(results);
      }
    );
  });
}
/**
 *
 * @param {Object} param0
 * @param {String} param0.username
 * @param {String} param0.group_id
 * @param {String} param0.admin  
 * @param {Number} param0.Userid
 * @return {Promise}
 */


function addUserToGroup({
    username,
    group_id: group_id,
    admin: admin,
    usernameToAdd : usernameToAdd
}){
    return new Promise(function(resolve, reject) {
      pool.query(`INSERT INTO UserGroups(username,group_id,admin) VALUES (?,?,?) WHERE
      (SELECT COUNT(username) FROM UserGroups WHERE (username=? AND admin=1) `,
    [
      usernameToAdd,
      group_id,
      admin,
      username,
    ],
        function(error, results) {
          if (error) {
            reject(error);
            return;
          }
          resolve(results);
        }
      );
    });
  }

/**
 *
 * @param {Object} param0
 * @param {String} param0.username
 * @param {String} param0.group_id
 * @param {Number} param0.usernameToChange
 * @return {Promise}
 */


function makeUserAdmin({
    username,
    group_id: group_id,
    admin: admin,
    usernameToChange : usernameToChange
}){
    return new Promise(function(resolve, reject) {
      pool.query(`UPDATE UserGroups SET admin = 1 WHERE username=? AND group_id = ?
      (SELECT COUNT(username) FROM UserGroups WHERE (username=? AND admin=1) `,
    [
      usernameToChange,
      group_id,
      username,
    ],
        function(error, results) {
          if (error) {
            reject(error);
            return;
          }
          resolve(results);
        }
      );
    });
  }

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
              (error, results, fields) => {
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
                        name,
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
module.exports = groupModel;

