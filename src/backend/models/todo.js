const { DataTypes } = require('sequelize');
const sequelize = require('../db/mysql');
const User = require('./user');

const ToDo = sequelize.define('todos', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    userID: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [1, 100]
        }
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    isCompleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
});

ToDo.belongsTo(User, {foreignKey: 'user_id'});

module.exports = ToDo;