/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('users', {
    user_no: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    alias: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    email: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    verify_code: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    level: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    point: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    favorite_genre: {
      type: DataTypes.STRING(45),
      allowNull: true
    }
  }, {
    tableName: 'users'
  });
};
