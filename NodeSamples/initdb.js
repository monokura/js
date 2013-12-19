// webサーバ設定
var PORT = 9000;
var express = require('express');
var app = express();

// mongoサーバの設定
var mongoose = require('mongoose');

// userSchemaの定義
var userSchema = mongoose.Schema({
	userid: String,
	password: String,
	age: Number,
	hobby: [String]
});

// Collectionのモデル定義
var User = mongoose.model('User', userSchema);

// dbへの接続
mongoose.connect('mongodb://localhost/logindb');

var db = mongoose.connection;

// データ入力

	var user1 = new User({
		userid : "shirakura",
		password : "hoge",
		age : 23,
		hobby : ["game", "anime"]
	});

	user1.save();
	var user2 = new User({
		userid : "na2hiro",
		password : "fuga",
	age : 22,
		hobby : ["shogi"]
	});

user2.save();
