const dbconfig = require('../config/dbconfig');
var mysql = require('mysql');
var connection = mysql.createConnection(dbconfig.connection);
const jwt = require('jsonwebtoken');

module.exports = function(app, passport) {

    // 로그인 여부 테스트
    app.get ('/', isLoggedIn, function (req, res) {
        res.json({data: "로그인 됨!"});
    });
   
    // 로그인하기
    app.post('/login', passport.authenticate('local-login', {failWithError: true}),
        (req, res) => {
            res.json({message:"Success", username: req.user.username, token:req.user.token});
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

    // 회원가입하기
    app.post('/register', passport.authenticate('local-signup', {failWithError: true}), 
        (req, res) => {
        // If this function gets called, authentication was successful.
        // `req.user` contains the authenticated user.
        // Then you can send your json as response.
            res.json({ message:"Success" , username: req.user.username });
        },
        function (err, req, res, next) {
            res.json({message:"Fail"});
        }
    );

    // 로그아웃하기
    app.get('/logout', function(req,res) {
        req.logout();
        res.redirect('/');
    });
};

function isLoggedIn(req, res, next){
    try{
        req.user = jwt.verify(req.headers.authtoken, require("../config/secretkey.js"));
        //console.log(req.user);
        return next();
    }catch(e) {
        next(e);
    }
};

