var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: ' ));

db.once('open', function callback(){
	var userScheme = mongoose.Schema({
		name: String
		age: Number
		syumi:[String]
	});

	userScheme.methods.ageInc = function(){
		this.age += 1;
	}

	userScheme.methods.addSyumi = function(){
		// hunyaaaaaaaa
	}
}

var users = mongoose.model('Users', userScema);
