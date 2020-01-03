const dbconfig = require('../config/dbconfig');
var mysql = require('mysql');
//var pool = mysql.createPool(dbconfig.connection);
var connection = mysql.createConnection(dbconfig.connection);

module.exports = function(app, passport) {

    // 로그인 여부 테스트
    app.get ('/', isLoggedIn, function (req, res) {
        res.json({data: "로그인 됨!"});
    });
   
    // 로그인하기
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

    // 게시판 목록보기
    app.get('/getBoard/:boardName', function(req,res) {
        let boardDBName = "board_"+req.params.boardName;
        connection.query("SELECT `articleid`, `writeralias`, `title`, `writetime`, `edittime`, `hit`, `like` FROM ?? ORDER BY articleid DESC", boardDBName, 
        function(err, rows) {
            if(err) {
                console.log(err);
                res.json({message:"Fail"});
            }
            else res.json({message:"Success", data:rows});
        });
    })

    // 게시판 미리보기
    app.get('/getBoardThumb/:boardName', function(req,res) {
        let boardDBName = "board_"+req.params.boardName;
        connection.query("SELECT `articleid`, `writeralias`, `title`, `hit`, `like` FROM ?? LIMIT 5 ORDER BY articleid DESC", boardDBName, 
        function(err, rows) {
            if(err) {
                console.log(err);
                res.json({message:"Fail"});
            }
            else res.json({message:"Success", data:rows});
        });
    })

    // 한줄리뷰 목록 보기
    app.get('/shortreview', function(req,res) {
        let boardDBName = "board_shortreview";
        connection.query("SELECT `articleid`, `title`, `rating`, `preference`, `good`, `bad`, `image`, `content` FROM ?? ORDER BY articleid DESC", boardDBName, 
        function(err, rows) {
            if(err) {
                console.log(err);
                res.json({message:"Fail"});
            }
            else {
                rows.forEach(e => {
                    e.good = e.good.split(',');
                    e.bad = e.bad.split(',');
                });
                res.json({message:"Success", data:rows});
            }
        });
    })

    // 상세리뷰 목록 보기
    app.get('/longreview', function(req,res) {
        let boardDBName = "board_longreview";
        connection.query("SELECT `articleid`, `title`, `rating`, `preference`, `good`, `bad`, `image`, `content` FROM ?? ORDER BY articleid DESC", boardDBName, 
        function(err, rows) {
            if(err) {
                console.log(err);
                res.json({message:"Fail"});
            }
            else {
                rows.forEach(e => {
                    e.good = e.good.split(',');
                    e.bad = e.bad.split(',');
                });
                res.json({message:"Success", data:rows});
            }
        });
    })
    
    // 한줄리뷰 쓰기 (테스트)
    app.post('/shortreview', function(req,res) {
        console.log(req.body.good);
        var good = req.body.good.join(",");
        var bad = req.body.bad.join(",");
        var data = [54, "테스트 유저", req.body.title, req.body.rating, req.body.preference, good, bad, req.body.image, req.body.content]
        connection.query("INSERT INTO board_shortreview (title, rating, preference, good, bad, image, content, writetime) VALUES (?,?,?,?,?,?,?,NOW())", data,
        function(err, rows) {
            if(err) {
                console.log(err);
                res.json({message:"Fail"});
            }else {
                res.json({message:"success"});
            }
        })
    })
};

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()) {
        console.log("auth success");
        return next();
    }
    res.json({message:"Login needed"});
};
