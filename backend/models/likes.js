/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('likes', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        boardname: {
            type: DataTypes.STRING(45),
            allowNull: false
        },
        articleid: {
            type: DataTypes.INTEGER(11),
            allowNull: false
        },
        user_no: {
            type: DataTypes.INTEGER(11),
            allowNull: false
        },
        likeordislike: {
            type: DataTypes.INTEGER(4),
            allowNull: false,
            defaultValue: '-1'
        },
    }, {
        tableName: 'likes'
    });
};