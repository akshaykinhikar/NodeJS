var express = require('express');
var morgan = require('morgan'); // middleware
var mongoose = require('mongoose');

var bodyParser = require('body-parser');

var ejs = require('ejs');
var ejsMate = require('ejs-mate');

var session = require('express-session');
var cookieParser = require('cookie-parser');
var flash = require('express-flash');

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
app.use(express.static(__dirname + '/public'));

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: "akshay@123"
}));
app.use(flash());


app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');

var mainRoutes = require('./routes/main');
app.use(mainRoutes);

var userRoutes = require('./routes/user');
app.use(userRoutes);

app.listen(3000, function(err) {
    if(err) throw err;
    console.log("server is running on 3000");
});