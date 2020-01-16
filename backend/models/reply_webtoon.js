/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('reply_webtoon', {
    reply_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    articleid: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    writerid: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    writeralias: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    createdAt: 'writetime',
    updatedAt: 'edittime',
    tableName: 'reply_webtoon'
  });
};
