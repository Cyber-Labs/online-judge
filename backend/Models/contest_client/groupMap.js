const {pool} = require('../db');

/**
 * @param {String} username
 * @returns {Array} 
 */

 function groupMap(username){
     return new Array((resolve,reject) => {
         pool.query(
             'SELECT groupId FROM user_groups_map WHERE username IN (?)',
             [username],
             (error, results) => {
                 if(error){
                     console.log('failed');
                     return reject('Group not found');
                 }
                 console.log(results);
                 return resolve(results);
             }
        );
     });
 }

 module.exports = groupMap;