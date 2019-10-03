const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Component = sequelize.define('component', {
    id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: 'id'
    },
    name: {
        type: Sequelize.STRING(255),
        allowNull: false,
        field: 'name'
    },
    description: {
        type: Sequelize.STRING(2000),
        allowNull: true,
        field: 'description'
    }
});

module.exports = Component;