 var http = require('http');
 http.createServer(function(req,res){
 	res.writeHead(200,{'Content-type' : 'text/plain'});
 	res.end('hello world');

 }).listen(8000, '127.0.0.1');

 console.log("server running on 8000, 127.0.0.1");