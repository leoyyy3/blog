var mongodb = require("./db");

function User(user){
	this.name = user.name;
	this.password = user.password;
	this.email = user.email;
};

module.exports = User;

User.prototype.save = function(callback){
	var user = {
		name:this.name,
		password:this.password,
		email:this.email
	};
	mongodb.open(function(err,db){
		if(err){
			return callback(err);
		}
		db.collection('user',function(err,collection){
			if(err){
				mongodb.close();
				return callback(err);
			}
			collection.insert(user,{safe:true},function(err,user){
				mongodb.close();
				callback(null,user[0]);//成功，err为null，并返回存储后的文档
			})
		})
	})
};

User.find = function(name,callback){
	mongodb.open(function(err,db){
		if(err){
			return callback(err);
		}
		db.collection('user',function(err,collection){
			if(err){
				mongodb.close();
				return callback(err);
			}
			collection.findOne({name:name},function(err,user){
				mongodb.close();
				if(user){
					return callback(null,user);//成功，返回查询的用户信息
				}
				callback(err);
			})
		})
	})
}