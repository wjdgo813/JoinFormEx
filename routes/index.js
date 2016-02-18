var express = require('express');
var router = express.Router();
//var db = require('./mariaConn');
/* GET home page. */
router.get('/', function (req, res, next) {


    /*db.pool.query("SELECT * FROM gosl", function (err, results) {

        console.log("ddddd");
        console.log(results.rows);	// 조회 결과
        console.log(results.rows[1].name);
        console.log(results.info);	// 결과정보
        console.log(results.info.numRows);	// 카운터 수
    });
*/
    res.render('index', {title: 'Express'});
});


module.exports = router;
