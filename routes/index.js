var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: '主页' });
});

router.get('/hello',function(req,res){
	res.render('for', { title: 'Express', lis:['one','two','three']});
})

router.get('/reg', function(req, res) {
  res.render('reg', { title: '注册' });
});

router.get('/login', function(req, res) {
  res.render('login', { title: '登录' });
});

router.get('/post', function(req, res) {
  res.render('post', { title: '发表' });
});

router.get('/logout', function(req, res) {
  res.render('logout', { title: '退出' });
});

module.exports = router;
