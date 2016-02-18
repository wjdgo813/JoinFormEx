var express = require('express');
var router = express.Router();
var db = require('./mariaConn');
var app = require('../app');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.send("hi");

});
var sign_up_post =function(req,res){
  res.status(200);
  console.log(req.id);
  var curId = req.id;
  if(curId=""){
    res.send("plz input the id");
  }
  else{
    var myid = req.id;
    var mypasswd = app.hash(req.passwd);
    var myname = req.name;
    var myemail = req.email;


     db.pool.query('insert into member values(:id, :passwd, :name, :email)',{id:myid,passwd:mypasswd,name:myname,email:myemail},function(err,results){
         console.log(err);
         console.log(results);	// 조회 결과
     });
  }
    //성공
  res.redirect('/');
}

router.post('/',function(req,res,next) {
    console.log("receive post!!")
    req.id = req.body.id;
    req.passwd = req.body.passwd;
    req.name = req.body.name;
    req.email = req.body.email;
    next();
  console.log("success post!!")
},sign_up_post);



module.exports = router;
