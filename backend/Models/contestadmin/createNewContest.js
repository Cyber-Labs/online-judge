const {pool} = require('../db')

function createNewContest({
	username,
	title,
	about,
	rules,
	prize,
	start_time:startTime,
	end_time:endTime,
	group_id:groupId,
	confidential
}){
	return new Promise((resolve,reject)=>{
		pool.getConnection(function(err,connection){
			if(err)
				return reject(error);
			connection.beginTransaction(function(err){
				if(err)
					return reject(err);
				connection.query(
					'SELECT is_admin FROM users WHERE username=?',
					[username],
					(error,results)=>{
						if(error){
							return connection.rollback(function(){
								return reject(error);
								connection.release();
							})
						}
						if(results[0].is_admin==0){
							return reject("You are not allowed to create a contest");
						}
				connection.query(
					'INSERT INTO contests (username,title,about,rules,prize,start_time,end_time,group_id,confidential) VALUES (?,?,?,?,?,?,?,?,?)',
					[username,title,about,rules,prize,startTime,endTime,groupId,confidential],
					(error,results)=>{
						if(error){
							return connection.rollback(function(){
								return reject(error);
								connection.release();
							});
						}
						var id=results.id;
						connection.query(
							'INSERT INTO admin_of_contest (admin_name,contest_id,is_admin) VALUES (?,?,?)',
							[username,id,1],
							(error,result)=>{
								if(error){
							       return connection.rollback(function(){
								   return reject(error);
								   connection.release();
							    });
						      }
						      connection.commit(function(err){
						      	if(err){
						      		return connection.rollback(function(){
								      return reject(error);
								      connection.release();
						      	});
						      }

						      connection.release();
						      if(err){
						      	return connection.rollback(function(){
								   return reject(error);
								   connection.release();
						      }
						  }
	 					  return resolve("Succesfully added a new contest");
    })
          
          }) 
     })
     })
    })
  })
}
	

module.exports=createNewContest;