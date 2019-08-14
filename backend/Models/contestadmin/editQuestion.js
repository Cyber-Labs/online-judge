const {pool} = require('../db');

function editQuestion({
    username,
    contest_id:contestId,
    question_id:questionId,
    question_name:questionName, 
    type,
    problemstatement,
    solution,
    maxscore,
    negative,
    partial,
    difficulty,
    answer
}){
    return new Promise((resolve,reject)=>{
        pool.query(
            'UPDATE questions SET type = ?,question_name=?,problem_statement = ?,solution = ?,max_score = ?,negative = ?,partial = ?,difficulty = ?,answer=? WHERE (SELECT is_admin FROM admin_of_contest WHERE admin_name = ? AND contest_id = ?) AND id = ?',
            [type,questionName,problemstatement,solution,maxscore,negative,partial,difficulty,answer,username,contestId,questionId],
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

module.exports=editQuestion;