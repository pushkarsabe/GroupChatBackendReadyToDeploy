const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Signup = sequelize.define('signup', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING
    },
    phoneNumber: {
        type: Sequelize.STRING
    },
    password: {
        type: Sequelize.STRING
    }
});

module.exports = Signup;