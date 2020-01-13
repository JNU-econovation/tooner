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
    app.post('/board/webtoon', isLoggedIn, function(req,res) {
        WebtoonBoard.create({
            writerid: req.user.user_no,
            writeralias: req.user.useralias,
            title: req.body.title,
            content: req.body.content
        }).then(board => {
            res.json({ message: "success", articleid:board.articleid});
        });
    });

    app.get('/board/webtoon/:articleId', function(req,res) {
        getBoardArticle(res, WebtoonBoard, req.params.articleId);
    })

    app.get('/board/*', function(req,res) {
        res.status(404).json({message:"게시판이 없습니다."});
    })
};

function getBoardArticle(res, Board, articleId) {
    Board.findOne({
        where: { articleid: articleId }
    }).then(data => {
        if (data == null) {
            throw "없는 글 번호 입니다";
        }
        res.json({ message: "Success", data: data });
    }).catch(function (err) {
        res.status(500).json({ message: "Fail", exception: err });
    });
}

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

function addHit(Board, articleId, res) {
    Board.findOne({
        where: {articleid:articleId},
        attributes: ['hit']
    }).then (hit => {
        Board.update({
            hit: (hit.dataValues.hit)+1
        }, {
            where: {articleid: articleId},
            silent: true
        })
    }).catch(function(err) {
        res.status(500).json({ message: "Fail", exception:err});
    });
}