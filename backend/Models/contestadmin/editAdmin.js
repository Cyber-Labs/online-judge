const {pool} = require('../db');

function editAdmin({
    username,
    contest_id:contestId,
    adminname,
    newvalue
}){
    return new Promise((resolve,reject)=>{
        pool.query(
            'UPDATE admin_of_contest SET admin_of_contest.is_admin=? WHERE (SELECT is_admin FROM admin_of_contest WHERE admin_name =? AND contest_id = ?) AND admin_name = ? AND contest_id = ? ',
            [newvalue,username,contestId,adminname,contestId],
            (error,results)=>{
                if(error){
                    return reject(error);
                }
                if(results.affectedRows==0){
                    return reject('You cannot edit an admin');
                }
                return resolve("Successfully deleted");

            })
    })
}

module.exports=editAdmin;