const { isLoggedIn } = require("./isLoggedIn");
var { Webtoons } = require('../models');

module.exports = function(app) {
    app.get('/webtoons', function(req,res) {
        Webtoons.findAll({
            order: [['toon_name', 'ASC']],
            attributes: ['toon_id', 'toon_name']
        }).then(data => {
            res.json({ message: "Success", data: data });
        }).catch(function(err) {
            res.status(500).json({ message: "Fail", exception:err});
        });
    });

    app.get('/webtoons/:toonId', function(req,res) {
        Webtoons.findOne({
            where: { toon_id : req.params.toonId }
        }).then(data => {
            res.json({ message: "Success", data:data });
        }).catch(function(err) {
            res.status(500).json({ message: "Fail", exception:err});
        });
    });
};