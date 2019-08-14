const {pool} = require('../db');

function deleteAdmin({
    username,
    contest_id:contestId,
    adminname
}){
    return new Promise((resolve,reject)=>{
        pool.query(
            'UPDATE admin_of_contest SET admin_of_contest.delete=1 WHERE (SELECT is_admin FROM admin_of_contest WHERE admin_name =? AND contest_id = ?) AND admin_name = ? AND contest_id = ? ',
            [username,contestId,adminname,contestId],
            (error,results)=>{
                if(error){
                    return reject(error);
                }
                if(results.affectedRows==0){
                    return reject('You can not delete an admin');
                }
                return resolve("Successfully deleted");

            })
    })
}

module.exports=deleteAdmin;