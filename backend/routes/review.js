const { isLoggedIn } = require("./isLoggedIn");
var { ShortReview, LongReview } = require('../models');

module.exports = function(app) {
    // 한줄리뷰 목록 보기
    app.get('/shortreview', function(req,res) {
        getReviewList(res, ShortReview, ['articleid', 'title', 'rating', 'preference', 'good', 'bad', 'image', 'content'], 20, req.query.page);
    })

    app.get('/shortreview/:articleId', function(req,res) {
        getReviewDetail(res, ShortReview, req.params.articleId);
    })

    // 상세리뷰 목록 보기
    app.get('/longreview', function(req,res) {
        getReviewList(res, LongReview, ['articleid', 'title', 'writeralias', 'rating', 'preference', 'good', 'bad', 'image', 'reviewtitle', 'content', 'writetime', 'hit', 'like'], 20, req.query.page);
    })

    app.get('/toplike/longreview', function(req,res) {
        getTopLike(res, LongReview, 4);
    })

    app.get('/longreview/:articleId', function(req,res) {
        getReviewDetail(res, LongReview, req.params.articleId);
    })

    // 한줄리뷰 쓰기
    app.post('/shortreview', isLoggedIn, function(req,res) {
        writeReview(req, res, ShortReview);
    })

    // 상세리뷰 쓰기
    app.post('/longreview', isLoggedIn, function(req,res) {
        writeReview(req, res, LongReview);
    })

    app.put('/shortreview/:articleId', isLoggedIn, function(req,res) {
        putReview(req, res, ShortReview);
    })

    app.put('/longreview/:articleId', isLoggedIn, function(req,res) {
        putReview(req, res, LongReview);
    })

    app.delete('/shortreview/:articleId', isLoggedIn, function(req, res) {
        deleteReview(req, res, ShortReview);
    })

    app.delete('/longreview/:articleId', isLoggedIn, function(req, res) {
        deleteReview(req, res, LongReview);
    })

    app.post('/shortreview/like/:articleId', isLoggedIn, function(req,res) {
        if(checkLike("shortreview", req.params.articleId, req.user.user_no)) {
            addLike(ShortReview, req.params.articleId, res);
        }else {
            res.status(400).json({status:"Fail", message:"이미 추천/비추천 하였습니다."});
        }
    })

    app.post('/longreview/like/:articleId', isLoggedIn, function(req,res) {
        if(checkLike("longreview", req.params.articleId, req.user.user_no)) {
            addLike(LongReview, req.params.articleId, res);
        }else {
            res.status(400).json({status:"Fail", message:"이미 추천/비추천 하였습니다."});
        }
    })

    app.post('/shortreview/dislike/:articleId', isLoggedIn, function(req,res) {
        addDislike(ShortReview, req.params.articleId, res);
    })

    app.post('/longreview/dislike/:articleId', isLoggedIn, function(req,res) {
        addDislike(LongReview, req.params.articleId, res);
    })
};

function getReviewList(res, Review, attributes, limit, page) {
    if(!page) page = 1;
    Review.count().then(count => {
        Review.findAll({
            order: [['articleid', 'DESC']],
            limit: limit,
            offset: (page-1)*limit,
            attributes: attributes
        }).then(data => {
            data.forEach(e => {
                if (e.good != null)
                    e.good = e.good.split(',');
                if (e.bad != null)
                    e.bad = e.bad.split(',');
                if (e.image != null)
                    e.image = e.image.split(':')[0];
            });
            res.json({ message: "Success", count: count, data: data });
        });
    }).catch(function (err) {
        res.status(500).json({ message: "Fail", exception:err});
    });
}

function getReviewDetail(res, Review, articleId) {
    Review.findOne({
        where:{articleid:articleId}
    }).then(data => {
        if(data == null) {
            throw "없는 글 번호 입니다";
        }
        if (data.good != null)
            data.good = data.good.split(',');
        if (data.bad != null)
            data.bad = data.bad.split(',');
        if (data.image != null)
            data.image = data.image.split(':');
        addHit(Review, articleId, res);
        res.json({ message: "Success", data: data });
    }).catch(function(err) {
        res.status(500).json({ message: "Fail", exception:err});
    });
}

//TODO: 최근 리뷰 우선 표시
function getTopLike(res, Review, limit) {
    if(!page) page = 1;
    Review.count().then(count => {
        Review.findAll({
            order: [['like', 'DESC']],
            limit: limit,
            attributes: ['articleid', 'writeralias', 'title', 'writetime', 'edittime', 'hit', 'like']
        }).then(data => {
            res.json({ message: "Success", count: count, data: data });
        });
    }).catch(function(err) {
        res.status(500).json({ message: "Fail", exception:err});
    });
}

function writeReview(req, res, Review) {
    console.log(req.body);
    if (req.body.good != null)
        var good = req.body.good.join(",");
    if (req.body.bad != null)
        var bad = req.body.bad.join(",");
    if (req.body.image != null)
        var image = req.body.image.join(":");
    
    Review.create({
        writerid: req.user.user_no,
        writeralias: req.user.useralias,
        title: req.body.title,
        rating: req.body.rating,
        preference: req.body.preference,
        good: good,
        bad: bad,
        image: image,
        reviewtitle: req.body.reviewtitle,
        content: req.body.content
    }).then(review => {
        res.json({ message: "success", articleid:review.articleid});
    });
}

function putReview(req, res, Review) {
    Review.findOne({
        where: { articleid: req.params.articleId },
        attributes: ['writerid']
    }).then(article => {
        if (article.dataValues.writerid != req.user.user_no) {
            res.status(403).json({ message: "자신의 글이 아닙니다" });
        }
        else {
            if (req.body.good != null)
                var good = req.body.good.join(",");
            if (req.body.bad != null)
                var bad = req.body.bad.join(",");
            if (req.body.image != null)
                var image = req.body.image.join(":");
            Review.update({
                title: req.body.title,
                rating: req.body.rating,
                preference: req.body.preference,
                good: good,
                bad: bad,
                image: image,
                reviewtitle: req.body.reviewtitle,
                content: req.body.content
            }, {
                where: { articleid: req.params.articleId }
            }).then(review => {
                res.json({ message: "success", articleid: review.articleid });
            });
        }
    }).catch(function (err) {
        res.status(500).json({ message: "Fail", exception: err });
    });
}

function deleteReview(req, res, Review) {
    Review.findOne({
        where: { articleid: req.params.articleId },
        attributes: ['writerid']
    }).then(article => {
        if (article.dataValues.writerid != req.user.user_no) {
            res.status(403).json({ message: "자신의 글이 아닙니다" });
        }
        else {
            Review.destroy({
                where: { articleid: req.params.articleId }
            }).then(function () {
                res.json({ message: "Success" });
            });
        }
    }).catch(function (err) {
        res.status(500).json({ message: "Fail", exception: err });
    });
}

function addHit(Review, articleId, res) {
    Review.findOne({
        where: {articleid:articleId},
        attributes: ['hit']
    }).then (hit => {
        Review.update({
            hit: (hit.dataValues.hit)+1
        }, {
            where: {articleid: articleId},
            silent: true
        })
    }).catch(function(err) {
        res.status(500).json({ message: "Fail", exception:err});
    });
}

function checkLike(boardname, articleId, user_no) {
    return true;
}

function addLike(Board, articleId, res) {
    Board.findOne({
        where: {articleid:articleId},
        attributes: ['like']
    }).then (like => {
        Board.update({
            like: (like.dataValues.like)+1
        }, {
            where: {articleid: articleId},
            silent: true
        })
        res.json({ message: "Success", like: (like.dataValues.like)+1});
    }).catch(function(err) {
        res.status(500).json({ message: "Fail", exception:err});
    });
}

function addDislike(Board, articleId, res) {
    Board.findOne({
        where: {articleid:articleId},
        attributes: ['dislike']
    }).then (dislike => {
        Board.update({
            dislike: (dislike.dataValues.dislike)+1
        }, {
            where: {articleid: articleId},
            silent: true
        })
        res.json({ message: "Success", dislike: (dislike.dataValues.dislike)+1});
    }).catch(function(err) {
        res.status(500).json({ message: "Fail", exception:err});
    });
}