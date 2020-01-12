/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('board_webtoon', {
    articleid: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    writerid: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    writeralias: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    title: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    hit: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    },
    like: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    },
    dislike: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    }
  }, {
    createdAt: 'writetime',
    updatedAt: 'edittime',
    tableName: 'board_webtoon'
  });
};
