var express = require('express');
var app = express();


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


// GET処理
app.get("/login_get", function(req, res){
	console.log("get start");
	
	//res.contentType(application/json);
	
	var testJson = {
		name:'shirakura',
		pass:'password'
	};

	var testJsonString = JSON.stringify(testJson);

	res.statusCode = 200;
	res.send(testJsonString);
});

// post処理
app.post("/login_post", function(req, res){
	console.log("post start");

	//:res.contentType(application/json);
	
	var testJson = {
		name:'shirakura',
		pass:'password'
	};

	var testJsonString = JSON.stringify(testJson);

	res.statusCode = 200;
	res.send(testJsonString);
});

app.listen(3000);
