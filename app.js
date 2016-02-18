var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var crypto = require('crypto'); //암호화
var session = require('express-session');

var routes = require('./routes/index'); // url = '/'
var users = require('./routes/users'); //
//var join = require('./routes/joinForm.js');  //회원가입 form
var signUp = require('./routes/sign_up'); //회원가입 url
var login = require('./routes/login');
var book_mark_create = require('./routes/book_mark_create');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));
//session
app.use(session({
  secret:'keyboard cat',
  resave:false,
  saveUninitialized:true,
  cookie:{secure:true}
}));

/*
* URL 설정
* */
app.use('/', routes);
app.use('/users', users);
//app.use('/join',join);
app.use('/sign_up',signUp);
app.use('/login',login);
app.use('/book_mark_create',book_mark_create);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


/*비밀번호 암호화 ( HASH 작업 )
* */
module.exports.hash = function(key){
  var hash = crypto.createHash('sha1');
  hash.update(key);
  return hash.digest('hex');
}

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
