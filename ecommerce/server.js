var express = require('express');
var morgan = require('morgan'); // middleware
var mongoose = require('mongoose');

var app = express();
var DBURL = 'mongodb://akshaykinhikar:thisispassword@ds247347.mlab.com:47347/ecommerce-node';
mongoose.connect(DBURL, function(err){
    if(err){
        console.log("Err", err);
    } else {
        console.log("connected to database");
    }
})

//Middleware
app.use(morgan('dev'));

app.get('/', function(req, res){
   res.json('my name is akshay'); 
});

app.listen(3000, function(err) {
    if(err) throw err;
    console.log("server is running on 3000");
});