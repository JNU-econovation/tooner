const dbconfig = require('../config/dbconfig');
var mysql = require('mysql');
var connection = mysql.createConnection(dbconfig.connection);

module.exports = function(app) {
    // 게시판 목록보기
    app.get('/board/:boardName', function(req,res) {
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
    app.get('/boardThumb/:boardName', function(req,res) {
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
        getReviewList(boardDBName, res);
    })

    // 상세리뷰 목록 보기
    app.get('/longreview', function(req,res) {
        let boardDBName = "board_longreview";
        getReviewList(boardDBName, res);
    })
};

function getReviewList(boardDBName, res) {
    connection.query("SELECT `articleid`, `title`, `rating`, `preference`, `good`, `bad`, `image`, `content` FROM ?? ORDER BY articleid DESC", boardDBName, function (err, rows) {
        if (err) {
            console.log(err);
            res.json({ message: "Fail" });
        }
        else {
            rows.forEach(e => {
                if (e.good != null)
                    e.good = e.good.split(',');
                if (e.bad != null)
                    e.bad = e.bad.split(',');
                if (e.image != null)
                    e.image = e.image.split(':')[0];
            });
            res.json({ message: "Success", data: rows });
        }
    });
}

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()) {
        console.log("auth success");
        return next();
    }
    res.json({message:"Login needed"});
};
