const express=require('express');
const router=express.Router();

const app=express();



router.get('/', (req, res) => {
    res.render('mycontestpage');
});


router.get('/new',(req,res)=>{
	res.render('createnewcontest');
})

router.post('/new',(req,res)=>{
	const {type,title,about,rules,prize,start_time,start_date,end_time,end_date,group}=req.body;

	db.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
  //var sql = "CREATE TABLE {} (id INT AUTO_INCREMENT PRIMARY KEY,contestid VARCHAR(255), type VARCHAR(255),title VARCHAR(255),about VARCHAR(255),rules VARCHAR(255),prize VARCHAR(255),start_date DATE,start_time TIME,end_date DATE,end_time TIME)";
  var sql="INSERT INTO contests (username,contestid,type,title,about,rules,prize,start_time,start_date,end_time,end_date,group) VALUES ?({},{},type,title,about,rules,prize,start_time,start_date,end_time,end_date,group)";
 
  db.query(sql, function (err, result) {
    if (err) throw err;
    console.log("entry added");
  });
});
});


app.use('/{contestid}',require('./contestlist/contestid'));

module.exports=router;



