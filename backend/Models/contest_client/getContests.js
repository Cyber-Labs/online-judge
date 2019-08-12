const {pool} = require('../db');

/**
 * @param {String} groupIdArray
 * @returns {Promise} 
 */

 function getContests(groupIdArray){
     return new Promise(function(resolve,reject){
         pool.query(
             'SELECT * FROM contests WHERE group_id IN (?) AND  confidential = 1',[groupIdArray],(error, results) => {
                 if(error){
                     console.log('failed');
                     return reject('Contest not found');
                 }
                 console.log(results);
                 return resolve(results);
             }
        );
     });
 }

 module.exports = getContests;  