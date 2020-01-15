/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('webtoons', {
    toon_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    toon_name: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    author: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    toon_genre: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    toon_description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    toon_url: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    image: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    platform: {
      type: DataTypes.STRING(55),
      allowNull: false
    },
    period: {
      type: DataTypes.INTEGER(4),
      allowNull: false
    },
    period_day: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: '0'
    },
    period_date: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: '0'
    },
    ratings: {
      type: DataTypes.FLOAT,
      allowNull: true
    },   
    restriction: {
      type: DataTypes.INTEGER(4),
      allowNull: false
    },

  }, {
    timestamps: false,
    tableName: 'webtoons'
  });
};
