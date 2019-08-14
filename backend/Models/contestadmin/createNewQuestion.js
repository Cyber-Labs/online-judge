const {pool} = require('../db');

function createNewQuestion({
    username,
    question_name:questionName,
    contest_id:contestId,
    type,
    problemstatement,
    solution,
    max_score:maxScore,
    negative,
    partial,
    difficulty,
    answer
}){
    return new Promise((resolve,reject)=>{
        pool.query(
            'INSERT INTO questions (username,question_name,contest_id,type,problem_statement,solution,maxscore,negative,partial,difficulty,answer) VALUES (?,?,?,?,?,?,?,?,?,?,?) WHERE (SELECT is_admin from admin_of_contest WHERE admin_name = ? AND contest_id = ?)',
            [username,questionName,contestId,type,problemstatement,solution,maxScore,negative,partial,difficulty,answer,username,contestId],
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

module.exports=createNewQuestion;