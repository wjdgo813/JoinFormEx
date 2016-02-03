var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('joinForm', { title: '회원가입폼~' });
});

router.post('/',function(req,res,next){
    console.log('req.body 콘솔 로그를 변경해 보았습니다~: '+req.body);

    var str = JSON.stringify(req.body);
    console.log('JSON : '+str);
    var JSONobj = JSON.parse(str);

    console.log('JSON id :'+JSONobj.id); //id 추출
    res.json(req.body);
});

module.exports = router;
