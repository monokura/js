var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  console.log('success');
  var kittySchema = mongoose.Schema({
    name: String
  });

  kittySchema.methods.speak = function(){
    var greeting = this.name
    ? "Meow name is " + this.name
    : "I don't have a name "
    console.log(greeting);
  }

  var Kitten = mongoose.model('Koneko', kittySchema);

  var silence = new Kitten({name: 'Silence'});
  console.log(silence.name);
  silence.speak();

//  silence.save(function(err, fluffy){
//        if(err)
//        fluffy.speak();
//  })

});

