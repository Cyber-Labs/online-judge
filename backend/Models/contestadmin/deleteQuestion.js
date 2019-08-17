const {pool} = require('../db');

function deleteQuestion({
    username,
    contest_id: contestId,
    question_id: questionId
}){
    return new Promise((resolve,reject)=>{
        podol.query(
            'UPDATE questions SET questions.delete_status=1 WHERE (SELECT is_admin FROM admin_of_contest WHERE admin_name =? AND contest_id = ?) AND id = ? ',
            [username,contestId,questionId],
            (error,results)=>{
                if(error){
                    return reject(error);
                }
                if(results.affectedRows==0){
                    return reject('You are not an admin');
                }
                return resolve("Successfully deleted");

            })
    })
}

module.exports=deleteQuestion;