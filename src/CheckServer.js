// webサーバ設定
var PORT = 9000;
var express = require('express');
var app = express();

// 
//app.use(express.bodyDecorder);

// mongoサーバの設定
var mongoose = require('mongoose');

// userSchemaの定義
var userSchema = mongoose.Schema({
	name: String,
	pass: String,
	age: Number,
	hobby: [String]
});

// Collectionのモデル定義
mongoose.model('User', userSchema);

// dbへの接続
var db = mongoose.connect('mongodb://localhost/hoge');


// post処理
app.get("/login", function(req, res){
	var name = req.param('name');
	var pass = req.param('pass');

	console.log("name = " + name);
	console.log("pass = " + pass);

	// 未入力処理
	if(!name){
		res.send("input name!");
	}
	if(!pass){
		res.send("input pass!");
	}

	var User = db.model('User');
	var user = new User();
	var input = {"name": name, "pass": pass};

	User.findOne(input).exec(function(err, result){
		console.log(result);
		if(result == null){
			res.send("not found!");
		}else{
			res.contentType('application/json');
			res.send(result);
		}
	});
});

app.listen(PORT);
