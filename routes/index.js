var crypto = require('crypto');
var User = require('../models/user.js')
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {//console.log(req.session.user.name)
  res.render('index', { 
  	title: '主页' ,
  	user: req.session.user,
  	success: req.flash('success').toString(),
  	error: req.flash('error').toString()
  });
});

router.get('/hello',function(req,res){
	res.render('for', { title: 'Express', lis:['one','two','three']});
})

router.get('/reg', function(req, res) {
  res.render('reg', { 
  	title: '注册',
  	user: req.session.user,
  	success: req.flash('success').toString(),
  	error: req.flash('error').toString()
  });
  
});

router.post('/reg', function(req, res) {
 // res.render('reg', { title: '注册' });
  var name = req.body.name,
  	  password = req.body.password,
  	  password_r = req.body.password_r;
  if(password != password_r){
  	req.flash('error','密码不一致');
  	console.log('密码不一致'+password+"//"+password_r);
  	return res.redirect('/reg');
  }
  //生成md5
  var md5 = crypto.createHash('md5'),
  	password = md5.update(req.body.password).digest('hex');
  	var newUser = new User({
  		name:req.body.name,
  		password:password,
  		email:req.body.email
  	});
  	User.find(newUser.name,function(err,user){
  		if(user){
  			req.flash('err','用户已经存在');
  			return res.redirect('/reg');
  		}
  		newUser.save(function(err,user){
  			if(err){
  				req.flash('error',err);
  				return res.redirect('/reg');
  			}
  			req.session.user = user;//用户信息存入session
  			req.flash('success','注册成功');
  			res.redirect('/');
  		})
  	})
});

router.get('/login', function(req, res) {
  res.render('login', { 
  	title: '登录' ,
  	user: req.session.user,
  	success: req.flash('success').toString(),
  	error: req.flash('error').toString()
  });
});

router.post('/login', function(req, res) {
  var md5 = crypto.createHash('md5'),
  password = md5.update(req.body.password).digest('hex');

  User.find(req.body.name,function(err,user){
  	if(!user){
  		req.flash('error','用户不存在');
  		return res.redirect('/login');
  	}
  	if(user.password != password){
  		req.flash('error','密码错误');
  		return res.redirect('/login');
  	}
  	req.session.user = user;
  	req.flash('success','登录成功');
  	res.redirect('/');
  })
});


router.get('/post', function(req, res) {
  res.render('post', { title: '发表' });
});

router.get('/logout', function(req, res) {
  req.session.user = null;
  req.flash('success','退出成功');
  res.redirect('/');
});

module.exports = router;
