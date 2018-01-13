var express = require('express');
var morgan = require('morgan'); // middleware
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var User = require('./models/user');

var app = express();

var DBURL = 'mongodb://akshaykinhikar:thisispassword@ds247347.mlab.com:47347/ecommerce-node';

//  // Use bluebird
// var options = { promiseLibrary: require('bluebird') };
// var db = mongoose.createConnection(uri, options);

// // mongoose.Promise = global.Promise;
// mongoose.Promise = require('bluebird');
// mongoose.createConnection(DBURL, options, function(err){ //connect
//     if(err){
//         console.log("Err", err);
//     } else {
//         console.log("connected to database");
//     }
// })

mongoose.connect(DBURL);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log("connected to database");
});

//Middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


//API
app.post('/create-user', function(req, res, next){
    var user = new User();
    
    user.profile.name = req.body.name;
    user.profile.password = req.body.password;
    user.profile.email = req.body.email;
    
    user.save(function(err){
        if(err) next(err);
        
        res.json('Successfully created a new user');
    })
    
})

// app.get('/', function(req, res){
//    res.json('my name is akshay'); 
// });

app.listen(3000, function(err) {
    if(err) throw err;
    console.log("server is running on 3000");
});