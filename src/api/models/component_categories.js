const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const ComponentCategorie = sequelize.define('componentCategorie', {
    id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: 'id'
    },
    name: {
        type: Sequelize.STRING(150),
        allowNull: false,
        field: 'name'
    },
    note: {
        type: Sequelize.STRING(2000),
        allowNull: true,
        field: 'note'
    }
}, { underscoredAll: true });



module.exports = ComponentCategorie;