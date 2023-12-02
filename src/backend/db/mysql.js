require('dotenv').config();

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('todo_app', process.env.DB_USER, process.env.DB_PASS, {
    host: 'localhost',
    dialect: 'mysql',
    define: { timestamps:true }
});

module.exports = sequelize;
