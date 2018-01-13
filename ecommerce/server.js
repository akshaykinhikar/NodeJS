var express = require('express');
var morgan = require('morgan'); // middleware

var app = express();


//Middleware
app.use(morgan('dev'));

app.get('/', function(req, res){
   res.json('my name is akshay'); 
});

app.listen(3000, function(err) {
    if(err) throw err;
    console.log("server is running on 3000");
});