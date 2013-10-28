// webサーバ設定
var PORT = 9000;
var express = require('express');
var app = express();

// mongoDBサーバの設定
var mongoose = require('mongoose');

// userSchemaを定義
var userSchema = mongoose.Schema({
	userid: String,
	password: String,
	age : Number,
	hobby: [String]
});

// Collectionのモデル定義
mongoose.model('User',userSchema);

// mydb(database)への接続
var db = mongoose.connect('mongodb://localhost:27017/logindb');

// ログイン初期処理
app.post("/", function(req,res){
	res.send("TOP");
});

// ログインサブミット処理
app.post("/login",function(req,res){
	var res_error = function(mes){
		res.contentType('application/json');
		var data = {
			"state":"error"
			"message": mes	
			
		};
		res.send(JSON.stringify(data));
	};

	var res_success = function(mes){
		res.contentType('application/json');
		var data = {
			"state":"success",
			"message":mes,
			"userid":userid,
			"password":password
		}
		res.send(JSON.stringify(data));
	};

	var userid = req.param('userid');
	var password = req.param('password');
	var create_new = req.param('new');

	// useridが未記入の処理
	if(!userid){
		res_error('not found "User ID"');
	}
	// passwordが未記入の処理
	if(!password){
		res_error('not found "Password"');
	}

	var User = db.model('User');
	var user = new User();
	var input = {"userid": userid, "password": password};

	// 新規ユーザアカウント作成
	if(create_new){
		User.find(input).one(function(doc){
			console.log(doc);
			// 同一アカウントがないのでmydbへ書き込み
			if(doc == null){
				user.userid = userid;
				user.passward = password;
				user.save();
				
				res_success('You get account!');

			}else{ // 同一のアカウントがある
				res_error('This account is already gotten!');
			}
		});
	}else{ // ログインチェック
		User.find(input).one(function(doc){
			console.log(doc);
			if(doc == null){
				res_error("UserID or Password is wrong!");
			}else{
				res_success("login succeess");
			}
		});
	}
});

app.listen(PORT);
