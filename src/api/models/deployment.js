const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Deployment = sequelize.define('Deployment', {
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
    type: {
        type: Sequelize.ENUM('VM','CLUSTER','DEDICATED'),
        allowNull: false,
        field: 'type'
    },
    note: {
        type: Sequelize.STRING(2000),
        allowNull: true,
        field: 'note'
    },
    startDate: {
        type: Sequelize.DATEONLY,
        allowNull: true,
        field: 'start_date'
    },
    endDate: {
        type: Sequelize.DATEONLY,
        allowNull: true,
        field: 'end_date'
    },
    active: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        field: 'active',
        defaultValue: 1
    },
}, { underscoredAll: true });

module.exports = Deployment;