/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('board_shortreview', {
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
    writetime: {
      type: DataTypes.DATE,
      allowNull: false
    },
    edittime: {
      type: DataTypes.DATE,
      allowNull: true
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    rating: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    preference: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    good: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    bad: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    image: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: 'board_shortreview'
  });
};
