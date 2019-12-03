var LocalStrategy = require("passport-local").Strategy;

var mysql = require('mysql');
var bcrypt = require('bcrypt-nodejs');
var dbconfig = require('./dbconfig');
var connection = mysql.createConnection(dbconfig.connection);

module.exports = function(passport) {
    passport.serializeUser(function(user, done) {
        done(null, user);
    });

    passport.deserializeUser(function(user, done) {
        done(null, user);
    });

    passport.use (
        'local-signup',
        new LocalStrategy({
            usernameField : 'username',
            passwordField : 'password',
            passReqToCallback : true
        },
        function(req, username ,password, done) {
            connection.query("SELECT * FROM users WHERE username = ? ",
            [username], function(err, rows) {
                if(err)
                    return done(err);
                if(rows.length) {
                    return done(null, false, { 'message' : '이미 사용중인 이메일입니다' });
                }else{
                    var newUserMysql = {
                        username : username,
                        password : bcrypt.hashSync(password, null, null),
                    };
                    var insertQuery = "INSERT INTO users (username, password) values (?, ?)"

                    connection.query(insertQuery, [newUserMysql.username, newUserMysql.password],
                        function(err, rows) {
                            newUserMysql.id = rows.insertId;
                            return done(null, newUserMysql);
                    });
                }
            });
        })
    );

    passport.use(
        'local-login',
        new LocalStrategy({
            usernameField : 'username',
            passwordField : 'password',
            passReqToCallback: true
        },
        function(req,username, password, done) {
            connection.query("SELECT * FROM users WHERE username = ? ", [username],
            function(err, rows) {
                if(err)
                    return done(err);
                if(!rows.length || !bcrypt.compareSync(password, rows[0].password))
                    return done(null, false, { 'message' : '아이디나 비밀번호가 잘못되었습니다.'});

                return done(null, rows[0]);
            });
        })
    );
};
