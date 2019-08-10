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
}

/**
 *
 * @param {Object} param0
 * @param {String} param0.username
 * @param {String} param0.secret_token
 * @param {String} param0.name
 * @param {String} param0.description
 * @param {String} param0.confidential
 * @return {Promise}
 */


function addGroup({
    username,
    name: name,
    description: description,
    confidential: confidential
}){
    return new Promise(function(resolve, reject) {
      pool.query(`INSERT INTO groups(name,description,confidential,created_by) VALUES (?,?,?,?) WHERE
      (SELECT COUNT(username) FROM users WHERE (username=? AND admin=1) `,
    [
      name,
      description,
      confidential,
      username,
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
 * @param {String} param0.secret_token
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
 * @param {String} param0.secret_token
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
 * @param {String} param0.secret_token
 * @param {Number} param0.group_id
 * @return {Promise}
 */

function getGroupById({
    username,
    secret_token:secret_token,
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
 * @param {String} param0.secret_token
 * @param {String} param0.description
 * @param {Number} param0.group_id
 * @return {Promise}
 */
function updateGroup({
    username,
    secret_token:secret_token,
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
 * @param {String} param0.secret_token
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
 * @param {String} param0.secret_token
 * @param {String} param0.group_id
 * @param {String} param0.admin  
 * @param {Number} param0.Userid
 * @return {Promise}
 */


function addUserToGroup({
    username,
    secret_token: secretToken,
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
 * @param {String} param0.secret_token
 * @param {String} param0.group_id
 * @param {Number} param0.usernameToChange
 * @return {Promise}
 */


function makeUserAdmin({
    username,
    secret_token: secretToken,
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
module.exports = groupModel;

