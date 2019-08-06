const express=require('express');
const mysql=require('mysql');
const router=express.Router();
const app=express();

router.get('/basicinfo',(req,res)=>{
	res.render('basicinfopage');
})

router.post('/basicinfo',(req,res)=>{
	const {title,about,rules,prize,start_time,start_date,end_time,end_date,group}=req.body;

db.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
  
        var sql="INSERT INTO basicinfo (username,contestid,basicinfoid,title,about,rules,prize,start_time,start_date,end_time,end_date,group) VALUES ?({},{},{},type,title,about,rules,prize,start_time,start_date,end_time,end_date,group)";
 
        db.query(sql, function (err, result) {
          if (err) throw err;
          console.log("basicinfo added");
     });
   });
});

router.get('/adminrights',(req,res)=>{
	res.render('adminrightspage');
})

router.post('/adminrights',(req,res)=>{
	const {title,about,rules,prize,start_time,start_date,end_time,end_date,group}=req.body;

db.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
  
        var sql="INSERT INTO adminrights (username,contestid,admininfofoid) VALUES ?({},{},{})";
 
        db.query(sql, function (err, result) {
          if (err) throw err;
          console.log("adminrights added");
     });
   });
});

router.get('/questions',(req,res)=>{
	res.render('questionspage');
})

router.post('/questions',(req,res)=>{
	const {questionname}=req.body;

	db.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
  
        var sql="INSERT INTO questions (username,contestid,allquestionsid,questionname) VALUES ?({},{},{},questionname)";
 
        db.query(sql, function (err, result) {
          if (err) throw err;
          console.log("questions added");
     });
   });

})


router.get('/questions/{questionid}',(req,res)=>{
	res.render('singlequestionpage');
})

router.post('/questions/{questionid}',(req,res)=>{
	const {questionname,probst,inpf,outf,cons,sampin,sampout,tag}=req.body;

	db.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
  
        var sql="INSERT INTO singlequestion (username,contestid,allquestionsid,questionid,questionname,probst,inpf,outf,cons,sampin,sampout,tag) VALUES ?({},{},{},{},questionname,probst,inpf,outf,cons,sampin,sampout,tag)";
 
        db.query(sql, function (err, result) {
          if (err) throw err;
          console.log("single question added");
     });
   });

})