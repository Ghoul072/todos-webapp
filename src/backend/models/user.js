const { DataTypes } = require('sequelize');
const sequelize = require('../db/mysql');
const bcrypt = require('bcrypt');
const Token = require('./token');
const ToDo = require('./todo');

const User = sequelize.define('users', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {isEmail: true},
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
        validate: {
            len: [8,100],
            isComplexPassword(value) {
                if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])/.test(value)) {
                    throw new Error('Password must contain at least one numeric, one simple and one capital letter, and one special character')
                }
            }
        }
    }
}, {
    hooks: {
        beforeCreate: async user => {
            const hashedPassword = await bcrypt.hash(user.password, 10);
            user.password = hashedPassword;
        },
        beforeUpdate: async user => {
            if (user.changed('password')) {
                const hashedPassword = await bcrypt.hash(user.password, 10);
                user.password = hashedPassword;
            }
        }
    }
});

User.hasOne(Token, { foreignKey: 'userId' });
Token.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(ToDo, { foreignKey: 'userId' })
ToDo.belongsTo(User, { foreignKey: 'userId' });

module.exports = User;