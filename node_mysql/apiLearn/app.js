var express = require('express');
var path = require('path');
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
var http = require('http');
var server = http.createServer(app);

// 跨域
// app.use(function(req,res,next){
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
//     res.header('Access-Control-Allow-Headers', 'Content-Type');
//     res.header("Content-Type", "application/json;charset=utf-8");
//     res.header('Access-Control-Allow-Credentials','true');
//     next();
//     })
    



app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// 静态资源
app.use(express.static(path.join(__dirname, 'public')));
// post请求
app.use(bodyParser.urlencoded({extended:true}))//extended:true 允许post请求
app.use('/index', indexRouter);
app.use('/users', usersRouter);



server.listen(3000,()=>{console.log('http://localhost:3000')});

// view engine setup 模板
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');
// 日志
// app.use(logger('dev'));
// app.use(express.json());



// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });


