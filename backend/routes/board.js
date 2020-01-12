const dbconfig = require('../config/dbconfig');
var mysql = require('mysql');
var connection = mysql.createConnection(dbconfig.connection);
const { isLoggedIn } = require("./isLoggedIn");
var { WebtoonBoard } = require('../models');

module.exports = function(app) {
    // 게시판 목록보기
    app.get('/board/webtoon', function(req,res) {
        getBoard(res, WebtoonBoard, 20, req.query.page);
    })

    app.get('/boardthumb/webtoon', function(req,res) {
        getBoard(res, WebtoonBoard, 5);
    })

    // 게시판 쓰기
    app.post('/board/:boardName', function(req,res) {
        const data = ["board_"+req.params.boardName, 54, "테스트 유저", req.body.title, req.body.content];
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

    app.get('/board/:boardName/:articleId', function(req,res) {
        let data = ["board_"+req.params.boardName, req.params.articleId];
        connection.query("SELECT * FROM ?? WHERE articleid=? ORDER BY articleid DESC", data, function(err, rows) {
            if(err) {
                console.error(err);
                res.json({message:"Fail"});
            }
            else {
                if(rows.length) {
                    addHit("board_"+req.params.boardName, req.params.articleId, res);
                    res.json({message:"Success", data:rows[0]});
                }
                else {
                    res.status(404);
                    res.json({message:"Not Found"});
                }
            }
        });
    })

    app.get('/board/*', function(req,res) {
        res.status(404).json({message:"게시판이 없습니다."});
    })
};

function getBoard(res, Board, limit, page) {
    if(!page) page = 1;
    Board.count().then(count => {
        Board.findAll({
            order: [['articleid', 'DESC']],
            limit: limit,
            offset: (page-1)*limit,
            attributes: ['articleid', 'writeralias', 'title', 'writetime', 'edittime', 'hit', 'like']
        }).then(data => {
            res.json({ message: "Success", count: count, data: data });
        });
    }).catch(function(err) {
        res.status(500).json({ message: "Fail", exception:err});
    });
}

function addHit(boardDBName, articleId, res) {
    const query = "SELECT `hit` FROM ?? WHERE articleid=?";
    const data = [boardDBName, articleId];
    connection.query(query, data, function (err, rows) {
        if (err) {
            console.log(err);
        } else {
            var hit = rows[0].hit;
            console.log(hit);
            connection.query("UPDATE ?? SET `hit` = ? WHERE `articleid` = ?", [boardDBName, hit+1, articleId], function (err, rows) {
                if (err) {
                    console.log(err);
                } 
            });
        }
    });
}