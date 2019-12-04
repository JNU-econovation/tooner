const dbconfig = require('../config/dbconfig');
var mysql = require('mysql');
var pool = mysql.createPool(dbconfig.connection);

module.exports = function(app, passport) {

    app.get ('/', isLoggedIn, function (req, res) {
        res.json({data: "로그인 됨!"});
    });
   
    app.post('/login', passport.authenticate('local-login', {failWithError: true}),
        (req, res) => {
            res.json({message:"Success", username: req.user.username});
        },
        function (err, req, res, next) {
            res.json({message:"Fail"});
        },
        function(req, res){
            if(req.body.remember) {
                req.session.cookie.maxAge = 1000 * 60 * 3;
            } else {
                req.session.cookie.expires = false;
            }
        }
    );

    app.post('/register', passport.authenticate('local-signup'), function(req, res) {
        // If this function gets called, authentication was successful.
        // `req.user` contains the authenticated user.
        // Then you can send your json as response.
        if(req.user.message) {
            res.json(req.user);
        }else {
        res.json({ message:"Success" , username: req.user.username });
        }
    });

    app.get('/logout', function(req,res) {
        req.logout();
        res.redirect('/');
    });

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
