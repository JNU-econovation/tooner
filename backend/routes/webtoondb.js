const { isLoggedIn } = require("./isLoggedIn");
var { Webtoons } = require('../models');

module.exports = function(app) {
    app.get('/webtoons', function(req,res) {
        Webtoons.findAll({
            order: [['toon_name', 'ASC']],
            attributes: ['toon_id', 'toon_name', 'author']
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
            data.toon_genre = data.toon_genre.split(",");
            data.platform = data.platform.split(",");
            data.period_day = data.period.date != null ? data.period_day.split(",") : null;
            data.period_date = data.period.date != null ? data.period_date.split(",") : null;
            res.json({ message: "Success", data:data });
        }).catch(function(err) {
            res.status(500).json({ message: "Fail", exception:err});
        });
    });
};