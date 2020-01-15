const { isLoggedIn } = require("./isLoggedIn");
var { User } = require('../models');

module.exports = function(app) {
    app.get('/userinfo', isLoggedIn, function(req,res) {
        User.findOne({
            where: {user_no: req.user.user_no},
            attributes: ['username', 'alias', 'verify_code', 'favorite_genre']
        }).then(user => {
            res.json({message: "Success", data: user.dataValues});
        }).catch(function (err) {
            res.status(500).json({ message: "Fail", exception: err });
        });
    })

    app.put('/userinfo', isLoggedIn, function(req,res) {
        User.update({
            alias: req.body.alias,
            favorite_genre: req.body.favorite_genre
        }, {
            where: {user_no: req.user.user_no}
        }).then(user => {
            res.json({message: "Success", data: user.dataValues});
        }).catch(function (err) {
            res.status(500).json({ message: "Fail", exception: err });
        });
    })
};