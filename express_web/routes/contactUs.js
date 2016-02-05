var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('contactUs', { title: 'Contact' });
});

router.post('/send', function(req, res, next){
	var transporter = nodemailer.createTransport({
		services: 'Gmail',
		auth: {
			user: 'kinhikar.akshay32@gmail.com',
			pass: 'something'
		}
	});

	var mailOptions = {
		from: 'Akash <acwankhede@gmail.com>',
		to: 'kinhikar.akshay32@gmail',
		subject: 'Website Submition',
		text: 'Name ' +req.body.name+ ' Email ' +req.body.email+ ' Message ' +req.body.msg,
		html: '<p> lorem and ipsome </p> <ul> <li> Name: ' +req.body.name+ '</li> <li> Email: ' +req.body.email+ '</li> <li> Message: ' +req.body.msg+ '</li> </ul>'  
	}
	transporter.sendMail(mailOptions, function(error, info){
		if(error){
			console.log(error);
			res.redirect('/');
			} else{
				console.log('Mesage Sent : '+info.response);
				res.redirect('/');
			}		
	});
});

module.exports = router;
