const dbconfig = require('../config/dbconfig');
var mysql = require('mysql');
var pool = mysql.createPool(dbconfig.connection);

module.exports = function(app, passport) {

    app.post('/login', passport.authenticate('local-login', {
        failureRedirect: '/login',
        failureFlash: true
        }), (req, res) => {
            if(req.user.language == '0') {
                res.cookie('lang', 'ko');
            } else if(req.user.language == '1') {
                res.cookie('lang', 'en');
            }
            if(req.session.returnTo) {
                var redirURL = req.session.returnTo;
                delete req.session.returnTo;
                req.session.save(function (err) { // 세션에서 리다이렉션 URL 초기화
                    if(err) return next(err);
                    console.log(redirURL);
                    res.redirect(redirURL);  // 왔던곳으로 !!!
                });
            } else {
                res.redirect('/');
            }
        },
        function(req, res){
            if(req.body.remember){
                req.session.cookie.maxAge = 1000 * 60 * 3;
            }else{
                req.session.cookie.expires = false;
            }
    });

    app.post('/register', passport.authenticate('local-signup', {
        successRedirect: '/register/verify',
        failureRedirect: '/register',
        failureFlash: true
    }));

    app.get('/logout', function(req,res) {
        req.logout();
        res.redirect('/');
    });

    app.get('/login/forgot', function (req, res) {
        res.render('forgot');
    });
    
    app.get('/favicon.ico', (req, res) => res.status(204));


};

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()) {
        return next();
    }
    // remember where session come from
    req.session.returnTo = req.originalUrl;
    req.session.save(function (err) {
        if(err) return next(err);
        res.redirect('/login');
    });
};