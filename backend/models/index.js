var path = require('path');
var Sequelize = require('sequelize');

var env = process.env.NODE_ENV || 'database';
var config = require(path.join(__dirname, '..', 'config', 'dbconfig.json'))[env];
var db = {};

var sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = require('./user')(sequelize, Sequelize);
db.WebtoonBoard = require('./board_webtoon')(sequelize, Sequelize);
db.ShortReview = require('./board_shortreview')(sequelize, Sequelize);
db.LongReview = require('./board_longreview')(sequelize, Sequelize);
db.NoticeBoard = require('./board_notice')(sequelize, Sequelize);
db.Likes = require('./likes')(sequelize, Sequelize);
db.Webtoons = require('./webtoons')(sequelize, Sequelize);
module.exports = db;
