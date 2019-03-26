///// 路由操作
var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');
var ejs = require('ejs');
//存储在本地
var session = require('express-session');
var cookieParser = require('cookie-parser');
// var imghtml = require('./static/index')
var expImg = express();
//连接数据库操作
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
// time 定时器操作
const util = require('util');
const setTimeoutPromise = util.promisify(setTimeout);

var querystring = require('querystring');
 
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('hello phoebe 66666------------');
});

// expImg.use('/33',imghtml)

router.get('/11', function(req, res, next) {
  res.send('hello phoebe111111111111111111111111--------');
});

expImg.use(express.static('public'))
expImg.set('static', path.join(__dirname, '/src/static'));
expImg.engine('html', require('ejs').__express);  
expImg.set('view engine', 'html');
// expImg.use('/static', express.static(path.join(__dirname, 'public')))

//进去登录页面
router.get('/firstImg', function (req, res) {
  // res.type('html');
  // res.render('index')
  fs.readFile('/nodeCodeTest/node_express_app/myapp/static/login.html', function(err,data) {
    if (err) return console.log(err)
    res.setHeader('Content-Type', 'text/html');
    res.send(data)
    // console.log('async: ' + data.toString())
  })
})

//点击登录，不带数据
router.get('/secondImg', function (req, res) {
  fs.readFile('/nodeCodeTest/node_express_app/myapp/static/regin.html', function(err,data) {
    if (err) return console.log(err)
    res.setHeader('Content-Type', 'text/html');
    res.send(data)
  })
})

//测试cookie
router.get('/cookie', function(req, res, next) {
  if(req.cookies.user) {
    console.log(req.cookies);
    res.send('first time');
  } else {
    res.cookie('user', 'kiro', {maxAge: 60 * 1000}); //set 1min
    res.send('welcome');
  }
});

//http://kirochen.com/2015/07/09/about-cookie-session/ session
// 点击登录，并带上数据
router.get('/process_get', function (req, res) {
    var response = {
      "userName":req.query.userName,
      "passWord":req.query.passWord
  };
  // 放入cookie中
  res.cookie('userInfo',response);
  // res.end(JSON.stringify(response));
  MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
    if (err) throw err;
    var dbo = db.db("fristNode");
    dbo.collection("userInfo").find().toArray((err, result)=> { // 返回集合中所有数据
        if (err) throw err;
        console.log(result);
        result.forEach( item => {
          if (item.name == req.query.userName) {
            console.log(result, '登录成功');
            fs.readFile('/nodeCodeTest/node_express_app/myapp/static/test.html', function(err,data) {
              if (err) return console.log(err)
              res.setHeader('Content-Type', 'text/html');
              res.end(data,JSON.stringify(response))
            })
          }
          else {
            console.log('登录失败');
            // req.setEncoding("utf8");
            // res.write("<p> login is error, please regin and login again</p>")
            // res.render('loginerror');
          }
        })
        db.close();
    });
  });
})

router.get('/regin_get', function (req, res) {
  var response = {
    "userName":req.query.userName,
    "passWord":req.query.passWord
};
// 放入cookie中
res.cookie('userInfo',response);
// res.end(JSON.stringify(response));
MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
    if (err) throw err;
    var dbo = db.db("fristNode");
    var myobj = {name: req.query.userName,password: req.query.passWord};
    dbo.collection("userInfo").insertOne(myobj, function(err, res) {
        if (err) throw err;
        console.log("注册成功");
        db.close();
    });
});
fs.readFile('/nodeCodeTest/node_express_app/myapp/static/login.html', function(err,data) {
  if (err) return console.log(err)
  // res.end(data,JSON.stringify(response))
  res.setHeader('Content-Type', 'text/html');
  res.end(data,JSON.stringify(response))
  // var response = data
  // console.log('async: ' + data.toString())
})
// 输出 JSON 格式
})
//读取文件操作
// fs.open('./static/some.txt', 'r', (err, fd) => {
//   if (err) throw err;
//   console.log('************')
//   fs.close(fd, (err) => {
//     if (err) throw err;
//   });
// });

// fs.readFile('/nodeCodeTest/node_express_app/myapp/static/some.txt', function(err,data) {
//   if (err) return console.log(err)
//   console.log('async: ' + data.toString())
// })
// console.log('hahhaha')
module.exports = router;
