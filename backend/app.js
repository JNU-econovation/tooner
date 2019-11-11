const express = require('express');
const app = express();
const morgan = require('morgan');
const passport = require('passport');


// 로깅 모듈 
app.use(morgan('combined'));

app.get("/", function(req, res) {
    res.send("<big>Hello Tooners!</big>");
})

app.get("/tnrlogin/", function(req, res) {
    
})



var server = app.listen(80, function() {
    console.log("==============================================\nTooner Since 2019! Server is turning on......\n==============================================");
})