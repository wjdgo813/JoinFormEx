var express = require('express');
var router = express.Router();
/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

router.post('/', function (req, res, next) {

    console.log('req.body 콘솔 로그를 변경해 보았습니다~: ' + req.body);

    var str = JSON.stringify(req.body);
    var JSONobj = JSON.parse(str);
    console.log('JSON id :' + JSONobj.id); //id 추출
    // res.render('index',{title:JSONobj.id});
    var id = req.body.id;

    console.log("before sending " + id);
    var send = {
        message: id + " hello!",
        hello: "hi"
    }

    res.send(send, 500);
    //res.send 와 res.render는 같이 쓰면 에러남
});

module.exports = router;
