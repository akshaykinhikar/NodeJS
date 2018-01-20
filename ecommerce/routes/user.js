var router = require('express').Router();
var User = require('../models/user');
var passport = require('passport');
var passportCong = require('../config/passport');

//API
router.get('/login', function(req, res) {
    console.log("User: " + req.user);
    console.log("Authenticated?: " + req.isAuthenticated());
    if (req.user) return res.redirect('/');
    res.render('accounts/login', { message: req.flash('loginMessage') });
});


router.post('/login', passport.authenticate('local-login', {
    successRedirect: '/profile',
    failureRedirect: '/login',
    failureFlash: true
}));

router.get('/profile', function(req, res, next){
    User.findOne({ _id: req.user._id }, function(err, user) {
        if (err) return next(err);
        res.render('accounts/profile', { user: user });
    });
    // res.json(req.user);
});
router.get('/signup', function(req, res, next){
    res.render('accounts/signup', {
        errors: req.flash('errors')
    });
});

router.post('/signup', function(req, res, next){
    var user = new User();
    
    user.profile.name = req.body.name;
    user.email = req.body.email;    
    user.password = req.body.password;
    user.address = req.body.address;
    user.profile.picture = user.gravatar();

    User.findOne({ email: req.body.email }, function(err, existingUser) {
        if(existingUser){
            req.flash('errors', 'account with that email address alread exists');
            return res.redirect('/signup');
        } else {
            user.save(function(err, user){
                if(err) return next(err);
                req.logIn(user, function(err){
                    if(err) return next(err);
                    res.redirect('/profile');
                })
                // return res.redirect('/');
            });
        }
    }); 
});

router.get('/logout', function(req, res, next) {
    req.logout();
    res.redirect('/');
});

router.get('/edit-profile', function(req, res, next) {
    res.render('accounts/edit-profile', {message: 'success'});
});

router.post('/edit-profile', function(req, res, next) {
    User.findOne({_id: req.user._id}, function(err, user) {
        if(err) return next(err);

        if(req.body.name) user.profile.name = req.body.name;
        if(req.body.address) user.profile.address = req.body.address;

        user.save(function(err) {
            if(err) return next(err);
            req.flash('success', 'Profile edited successfully');
            return res.redirect('edit-profile');
        });
    });
});


module.exports = router;