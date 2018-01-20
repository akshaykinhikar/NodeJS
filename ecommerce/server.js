var express = require('express');
var morgan = require('morgan'); // middleware
var mongoose = require('mongoose');

var bodyParser = require('body-parser');

var ejs = require('ejs');
var ejsMate = require('ejs-mate');

var session = require('express-session');
var cookieParser = require('cookie-parser');
var flash = require('express-flash');
var MongoStore = require('connect-mongo')(session);
// var passport = require('passport');

var secret = require('./config/secret');
var User = require('./models/user');

var Category = require('./models/category');

var app = express();

mongoose.connect(secret.database);

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

//Configuring Passport
var passport = require('passport');
var expressSession = require('express-session');

app.use(cookieParser());
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: secret.secretKey,
  store: new MongoStore({url: secret.database, autoReconnect: true, collection: 'sessions'}),
  // cookie: {
  //   maxAge: 3600000 //1 Hour
  // }
}));

app.use(function(req, res, next) {
  Category.find({}, function(err, categories) {
    if(err) return next(err);
    res.locals.categories = categories;
    next();
  })
})

app.use(passport.initialize());
app.use(passport.session());

app.use(function(req, res, next){
  res.locals.user = req.user;
  next();
});
app.use(flash());


app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');


// routes
var mainRoutes = require('./routes/main');
app.use(mainRoutes);

var userRoutes = require('./routes/user');
app.use(userRoutes);

var adminRoutes = require('./routes/admin');
app.use(adminRoutes);


app.listen(secret.port, function(err) {
    if(err) throw err;
    console.log("server is running on 3000");
});