const {pool} = require('../db');

/**
 * @param {String} contest_id
 * @returns {Promise} 
 */

 function getQuestions(contest_id){
     return new Promise((resolve,reject) => {
         pool.query(
             'SELECT id,questionName,questionType,questionDifficulty,questionScore FROM questions WHERE contest_id = ?',
             [contest_id],
             (error, results) => {
                 if(error){
                     console.log('failed');
                     return reject('user not found');
                 }
                 console.log(results);
                 return resolve(results);
             }
        );
     });
 }

 module.exports = getQuestions;