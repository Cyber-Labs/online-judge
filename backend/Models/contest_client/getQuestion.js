const {pool} = require('../db');

/**
 * @param {String} question_id
 * @returns {Promise} 
 */

 function getQuestion(question_id){
     return new Promise((resolve,reject) => {
         pool.query(
             'SELECT * FROM questions WHERE questionid = ?',
             [question_id],
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

 module.exports = getQuestion;