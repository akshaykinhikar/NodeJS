var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/register', function(req, res, next){
	res.render('register',{
		'title' : 'Register' 
	});
});

router.get('/login', function(req, res, next){
	res.render('login',{
		'title' : 'Login' 
	});
});

router.post('/register', function(req,res,next){
	var name = req.body.name;
	var email = req.body.email;
	var userName = req.body.userName;
	var password = req.body.password;
	var password2 = req.body.password2;
	var password2 = req.body.password2;


	// if(req.file.profileImage){
	// 	console.log('Uploading Image');

	// 	//file Info
	// 	var profileImageOriginalName = req.files.profileImage.originalName;
	// 	var profileImageName = req.files.profileImage.Name;
	// 	var profileImageMime = req.files.profileImage.mimetype;
	// 	var profileImagePath = req.files.profileImage.path;
	// 	var profileImageSize = req.files.profileImage.size;
	// }else{
	// 	//set default Image
	// 	var profileImageName = 'noimage.png'
	// }

	req.checkBody('name', 'Name filed is required').notEmpty();
	req.checkBody('email', 'email filed is required').notEmpty();
	req.checkBody('email', 'email filed is required').isEmail();
	req.checkBody('userName', 'userName filed is required').notEmpty();
	req.checkBody('password', 'password filed is required').notEmpty();
	req.checkBody('password2', 'password2 filed is required').notEmpty();
	req.checkBody('password2', 'password2 filed is required').equals(req.body.password);

	//check for password
	var errors = req.validationErrors();

	if(errors){
		res.render('register',{
			errors : errors,
			name : name,
			email : email,
			userName : userName,
			password : password,
			password2 : password2
		});
	}else{
		var newUser = new User({
			name : name,
			email : email,
			userName : userName,
			password : password,
			// profileImage : profileImageName
		}); 

		//create user
		// User.createUser(newUser, function(error, user){
		// 	if(error) throw error;
		// 	console.log(user); 
		// });

		req.flash('success');
		res.location('/');
		res.redirect('/');
	}

 });
module.exports = router;
