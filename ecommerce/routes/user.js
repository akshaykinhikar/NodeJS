var router = require('express').Router();
var User = require('../models/user');

//API

router.get('/signup', function(req, res, next){
    res.render('accounts/signup', {
        errors: req.flash('errors')
    });
});

router.post('/signup', function(req, res, next){
    var user = new User();
    
    user.profile.name = req.body.name;
    user.password = req.body.password;
    user.email = req.body.email;

    User.findOne({email: req.body.email}, function(err, existingUser) {
        if(existingUser){
            // console.log(req.body.email + "is alread exist");
            req.flash('errors', 'account with that email address alread exists');
            return res.redirect('/signup');
        } else {
            user.save(function(err, user){
                if(err) return next(err);
                // res.flash('')
                return res.redirect('/');
                // res.json('Successfully created a new user');
            });
        }
    }); 
});


module.exports = router;