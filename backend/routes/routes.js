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
            if(req.body.remember) {
                req.session.cookie.maxAge = 1000 * 60 * 3;
            } else {
                req.session.cookie.expires = false;
            }
    });

    app.post('/register', passport.authenticate('local-signup'), function(req, res) {
        // If this function gets called, authentication was successful.
        // `req.user` contains the authenticated user.
        // Then you can send your json as response.
        res.json({message:"Success", username: req.user.username});
      });
};
