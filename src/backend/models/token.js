const { DataTypes } = require('sequelize');
const sequelize = require('../db/mysql');
const User = require('./user');

const Token = sequelize.define('tokens', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    accessToken: {
        type: DataTypes.STRING,
    },
    refreshToken: {
        type: DataTypes.STRING,
    }
});

module.exports = Token;
