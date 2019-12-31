const express = require('express');
var session = require('express-session');
const app = express();
const morgan = require('morgan');
var mysql = require('mysql');
const passport = require('passport');
var dbconfig = require('./config/dbconfig');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var flash = require('connect-flash');


const PORT = 2599;

require('./config/passport')(passport, mysql, dbconfig);

app.use(cookieParser());
app.use(bodyParser.json());

app.use(session({
    secret: 'justasecret',
    resave: true,
    saveUninitialized: true
   }));

// 로깅 모듈 
app.use(morgan('combined'));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

require('./routes/routes.js')(app, passport);

app.listen(PORT, function() {
    console.log("Tooner Beta\n==============================================\nTooner Since 2019! Server is on at port "+PORT+"......\n==============================================");
})