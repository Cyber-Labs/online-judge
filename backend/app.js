const express=require('express');
const mysql=require('mysql');
const router=express.Router();

const db = mysql.createConnection({
  host: "",
  user: "",
  password: "",
  database:""
});

db.connect((err)=> {
  if (err) {

  	throw err;
  }
  console.log("Connected!");
});


const app=express();
app.use('/mycontest',require('./routes/mycontest'));



app.listen('3000',()=>{
	console.log('connected');
});