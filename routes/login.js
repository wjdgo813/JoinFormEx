var express = require('express');
var router = express.Router();
var app = require('../app');
var db = require('./mariaConn');


router.get('/',function(req,res,next){
   res.render('loginForm',{title:"hi"});
});

var login_post=function(req,res){

    res.status(200);
    db.pool.query('select id from member where id= :id and passwd= :passwd',{id:req.id ,passwd:req.passwd},function(err,results){


        if(err!==null){
            console.log(err);
        }
        else{
            if(results.info.numRows >0){
                console.log("login Success!!");
                var send={
                    result :1
                }
                req.session.aa='test';
                res.json(send)
            }
            else{
                console.log("failed.....8)");
                var send={
                    result:0
                }
                res.json(send);
            }
        }
    });

}

/*비밀번호 암호화*/
router.post('/',function(req,res,next){
    console.log("receive data");
    console.log(req.session.aa);
    if(req.session.aa=='test'){ //undefined aa
        console.log("already login");
    }else{
    req.id = req.body.id;
    req.passwd = app.hash(req.body.passwd);

    next();}
},login_post);


module.exports = router;