/**
 * tooner api server
 * (c) 2019-2020 정회형 
 * https://hotheadfactory.com / h2f.kr
 */

const express = require('express');
var cors = require('cors');
const morgan = require('morgan');
const passport = require('passport');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var sequelize = require('./models').sequelize;

const app = express();
const PORT = 2599;

require('./config/passport')(passport);

app.use('/uploads', express.static(__dirname + '/uploads'));
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(passport.initialize());

// 라우터 불러오기
require('./routes/login.js')(app, passport);
require('./routes/board.js')(app);
require('./routes/review.js')(app);
require('./routes/upload.js')(app);
require('./routes/userdb.js')(app);
require('./routes/webtoondb.js')(app);
require('./routes/test.js');
app.use(function(err,req,res,next) {
    res.status(500).json({Status: Error, Data: err});
});
app.get ('*', function (req, res) {
    res.status(404).json({message: "Not Found"});
});

sequelize.sync();

app.listen(PORT, function() {
    console.log("Tooner Beta\n==============================================\nTooner Since 2019! Server is on at port "+PORT+"......\n==============================================");
})

