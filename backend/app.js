const express = require('express');
const app = express();
const morgan = require('morgan');
const passport = require('passport');

const PORT = 2599;

// 로깅 모듈 
app.use(morgan('combined'));

require('./routes/routes.js')(app, passport);

var server = app.listen(PORT, function() {
    console.log("Tooner Beta\n==============================================\nTooner Since 2019! Server is on at port "+PORT+"......\n==============================================");
})