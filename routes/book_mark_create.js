var express = require('express');
var router = express.Router();
var db = require('./mariaConn');
var app = require('../app');
/* GET home page. */
router.get('/', function (req, res, next) {
    res.send("hi");

});
var sign_up_post = function (req, res) {
    res.status(200);
    console.log(req.user_email);


    db.pool.query('select count(*) as num from tb_bookmark group by book_url having book_url=:url', {url: req.book_url}, function (err, result) {
        if (err) {//error 발생
            var result = {
                success: 0,
                result: {
                    message: err
                }
            }
            res.send(result);
            console.log(err);
        }
        // console.log(result);
        else {
            console.log(result.rows[0]);
            if (result.rows[0] != undefined) { //게시판에 이미 등록되어 있는 경우

                    db.pool.query('INSERT INTO tb_comment(BOOK_INDEX,COM_COMMENT,COM_PROS,USER_NO) ' +
                    ' VALUES((select book_index from tb_bookmark where book_url=:book_url),:com_comment,:com_pros,(SELECT USER_NO FROM TB_USER where USER_EMAIL=:user_email))',
                    {
                        book_url:req.book_url,
                        com_comment:req.com_comment,
                        com_pros:req.com_pros,
                        user_email:req.user_email
                    },
                    function(err,result2){
                        if(err){
                            var create_result = {
                                success: 0,
                                result: {
                                    message: err
                                }
                            }
                            res.send(create_result);
                            console.log(err);
                        }
                        else{
                            var create_result={
                                success:1,
                                result:{
                                    message:"등록완료"
                                }
                            }
                            res.json(create_result); //결과 값 전송
                            console.log(create_result);
                        }
                    }
                );
                console.log("중복!!");
            }
            else {

                db.pool.query('INSERT INTO tb_bookmark(BOOK_FAVORITE,BOOK_URL,BOOK_NAME,BOOK_THUMB) VALUES(:book_favorite,:book_url,:book_name,:book_thumb)',
                    {
                        book_favorite: req.book_favorite,
                        book_url: req.book_url,
                        book_name: req.book_name,
                        book_thumb: req.book_thumb
                    },
                    function (err, result) {
                        if (err) { //error 발생
                            var create_result = {
                                success: 0,
                                result: {
                                    message: err
                                }
                            }
                            res.send(create_result);
                            console.log(err);
                        }
                        else { //error 없을 시
                            //게시판 등록완료 후 댓글 등록 작업
                            db.pool.query('INSERT INTO tb_comment(BOOK_INDEX,COM_COMMENT,COM_PROS,USER_NO)' +
                                ' VALUES((SELECT BOOK_INDEX FROM tb_bookmark order by BOOK_INDEX desc limit 1),:com_comment,:com_pros,(SELECT USER_NO FROM TB_USER where USER_EMAIL=:user_email))',
                                {
                                    com_comment:req.com_comment,
                                    com_pros:req.com_pros,
                                    user_email:req.user_email
                                },function(err,result2){
                                    if(err){
                                        var create_result = {
                                            success: 0,
                                            result: {
                                                message: err
                                            }
                                        }
                                        res.json(create_result);
                                        console.log(create_result);
                                    }
                                    else{
                                        console.log("succcessssssssssssss");
                                        console.log(result2);
                                        var create_result={
                                            success:1,
                                            result:{
                                                message:"등록완료"
                                            }
                                        }

                                        res.json(create_result); //결과 값 전송
                                        console.log(create_result);
                                    }
                                }
                            );

                        } //if end
                    } //function end
                );
            }
        }
    });
/*
    //성공
    res.redirect('/');*/
}

router.post('/', function (req, res, next) {
    console.log("receive post!!");


    req.user_email = req.body.user_email; //사용자 email
    req.book_favorite = req.body.book_favorite; // 취향 //null
    req.book_url = req.body.book_url; //북마크 url
    req.book_name = req.body.book_name; //북마크 이름
    req.book_thumb = req.body.book_thumb; // 북마크 썸네일 //null
    req.com_comment = req.body.com_comment; // 댓글
    req.com_pros = req.body.com_pros; //댓글 좋아요,나빠요

    if (req.book_favorite == undefined) { //null 처리
        req.book_favorite = "";
    }
    if (req.book_thumb == undefined) { //null 처리
        req.book_thumb = "";
    }

    next();
    console.log("success post!!")
}, sign_up_post);


module.exports = router;
