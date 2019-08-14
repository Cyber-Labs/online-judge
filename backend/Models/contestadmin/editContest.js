const {pool} = require('../db')

function editContest({
  username,
  contest_id:contestId,
  title,
  about,
  rules,
  prize,
  start_time,
  end_time,
  group_id:groupId,
  confidential
}){
  return new Promise((resolve,reject)=>{
    pool.query(
      'UPDATE contests SET title=?,about=?,rules=?,prize=?,start_time=?,end_time=?,group_id=?,confidential=? WHERE (SELECT is_admin FROM admin_of_contest WHERE admin_name =? AND contest_id = ?) AND id = ?',
      [title,about,rules,prize,start_time,end_time,groupId,confidential,username,contestId,contestId],
      (error,results)=>{
                if(error){
                    return reject(error);
                }
                 if(results.affectedRows==0){
                    return reject('You are not an admin');
                }
                return resolve("Successfully edited");

            })
    })
}

module.exports=editContest;