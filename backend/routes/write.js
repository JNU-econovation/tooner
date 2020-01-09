const dbconfig = require('../config/dbconfig');
var mysql = require('mysql');
var connection = mysql.createConnection(dbconfig.connection);

module.exports = function(app) {
    // 한줄리뷰 쓰기 (테스트)
    app.post('/shortreview', function(req,res) {
        writeReview(req, res, "board_shortreview");
    })

    // 상세리뷰 쓰기 (테스트)
    app.post('/longreview', function(req,res) {
        writeReview(req, res, "board_longreview");
    })

    // 게시판 쓰기
    app.post('/board/:boardName', function(req,res) {
        const data = [boardName, 54, "테스트 유저", req.body.title, req.body.content];
        const sql = "INSERT INTO ?? (writerid, writeralias, title, content, writetime) VALUES (?,?,?,?,NOW())";
        connection.query(sql, data, function(err) {
            if(err) {
                console.error(err);
                res.status(400);
                res.json({ message: "Fail" });
            }
            else {
                res.json({ message: "success" });
            }
        });
    });
};

function writeReview(req, res, boardName) {
    console.log(req.body);
    if (req.body.good != null)
        var good = req.body.good.join(",");
    if (req.body.bad != null)
        var bad = req.body.bad.join(",");
    if (req.body.image != null)
        var image = req.body.image.join(":");
    var data = [boardName, 54, "테스트 유저", req.body.title, req.body.rating, req.body.preference, good, bad, image, req.body.content];
    connection.query("INSERT INTO ?? (writerid, writeralias, title, rating, preference, good, bad, image, content, writetime) VALUES (?,?,?,?,?,?,?,?,?,NOW())", data, function (err, rows) {
        if (err) {
            console.log(err);
            res.status(400);
            res.json({ message: "Fail" });
        }
        else {
            res.json({ message: "success" });
        }
    });
}

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()) {
        return next();
    }
    res.status(403);
    res.json({message:"Login needed"});
};
