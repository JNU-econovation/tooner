const { isLoggedIn } = require("./isLoggedIn");
var { User } = require('../models');

module.exports = function(app) {
    app.get('/userinfo', isLoggedIn, function(req,res) {
        console.log(req.user.user_no);
        User.findOne({
            where: {user_no: req.user.user_no},
            attributes: ['username', 'alias', 'verify_code', 'favorite_genre']
        }).then(user => {
            console.log(user);
            res.json({message: "Success", data: user.dataValues});
        }).catch(function (err) {
            res.status(500).json({ message: "Fail", exception: err });
        });
    })
};