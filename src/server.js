var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var express = require('express')
var app = express();


var userSchema = mongoose.Schema({
	name: String,
	pass: String,
    age: Number,
	hobby: [String],
})

userSchema.methods.incAge = function () {
        this.age++;
}
userSchema.methods.addHobby = function(hobby){
		console.log("Add Hobby : " + hobby);
        this.hobby.push(hobby);
}

var User = mongoose.model('User', userSchema)
 
//ユーザを追加
//var user = new User({
//	name: "shima",
//	pass: "kero",
//	age: 22,
//	hobby: ["game","music"]
//})
//user.save();

app.listen(3000);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: ' ));

db.once('open', function callback(){
	
	app.get('/user/',function(req, res){
		User.find().sort("age").exec( function(err, userList){
           		var body = JSON.stringify(userList);
			res.setHeader('Content-Type', 'text/plain');
			res.setHeader('Content-Length', body.length);
			res.end(body);
		})
	})

	app.get('/user/:id', function(req,res){
		console.log("userpage");
		User.find({name : req.params.id} , function(err, user){
			var body = JSON.stringify(user);
			res.setHeader('Content-Type', 'text/plain');
			res.end(body);
		})
	})

	app.get('/add_user', function(req, res){
		var newUser = new User({
			name: req.query.name,
			pass: req.query.pass,
		    age: parseInt(req.query.age),
			hobby:req.query.hobby.split(",")
		})
		newUser.save(function(err){
			if(err){
				console.log(err)
				var body = "error!";
				res.setHeader('Content-Type' , 'text/plain');
				res.setHeader('Content-Length', body.length);
				res.end(body);
			}else{
				var body = "success!";
				res.setHeader('Content-Type' , 'text/plain');
				res.setHeader('Content-Length', body.length);
				res.end(body);
			}	
		});
		
	})

	app.get('/add_hobby', function(req, res){
		var userName = req.query.name;
		var newhobby = req.query.hobby;
		var password = req.query.pass;

		console.log("check:");
		console.log(userName);
		console.log(newhobby);

		User.findOne({name : userName},function(err,user){
			if(user == null){
				console.log("not found");
				res.send("user not found!");	
			}
			if(user.pass != password){
				res.send("Pass word is wrong!");
			}else{
				console.log(user.name);
				user.addHobby(newhobby);
				user.save();
				res.send("Success!");
			}
		});	
	});
})
