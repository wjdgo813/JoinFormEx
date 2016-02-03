var express = require('express');
var router = express.Router();
var mongo = require('./mongoose.js');
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
    var id = req.id;
    var passwd = req.passwd;
    var name = req.name;
    var email = req.email;
      //mongo.makeUser(id,passwd,name,email); //여기에서 에러남 !! mongo.makeUser is not a function 에러!!
      //var signMember = mongo.Member;
      mongo.Member.findOne({id: id}, function (err, member) {
          if (err) return handleError(Err);

          if (member == null) {
              var myMember = new mongo.Member({id: id, password: passwd, email: email, name: name});
              myMember.save(function (err, data) {
                  if (err) {
                      console.log(err);
                  }
                  else {
                      console.log('member is inserted');
                  }
              });
          }
          else {
              console.log("id existing");
          }
      });
  }

  res.send(req.id)
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
