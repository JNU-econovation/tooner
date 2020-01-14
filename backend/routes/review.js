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
        getReviewList(res, LongReview, ['articleid', 'title', 'rating', 'preference', 'good', 'bad', 'image', 'reviewtitle', 'content'], 20, req.query.page);
    })

    app.get('/longreview/:articleId', function(req,res) {
        getReviewDetail(LongReview, req.params.articleId, res);
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
            data.image = data.image.split(':')[0];
        addHit(Review, articleId, res);
        res.json({ message: "Success", data: data });
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