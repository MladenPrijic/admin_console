const Sequelize = require('sequelize');

const sequelize = require('../util/database');
const Project =  require('./project');

const Client = sequelize.define('client', {
    id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: 'id'
    },
    name: {
        type: Sequelize.STRING(1000),
        allowNull: false,
        field: 'name'
    },
    conatactPerson: {
        type: Sequelize.STRING(150),
        allowNull: true,
        field: 'contact_person'
    },
    conatactPersonPhone: {
        type: Sequelize.STRING(100),
        allowNull: true,
        field: 'contact_person_phone'
    },
    email: {
        type: Sequelize.STRING(255),
        allowNull: true,
        field: 'email'
    },
    phone: {
        type: Sequelize.STRING(50),
        allowNull: true,
        field: 'phone'
    },
    address: {
        type: Sequelize.STRING(150),
        allowNull: true,
        field: 'address'
    },
    postalCode: {
        type: Sequelize.STRING(150),
        allowNull: true,
        field: 'postal_code'
    },
    city: {
        type: Sequelize.STRING(150),
        allowNull: true,
        field: 'city'
    },
    country: {
        type: Sequelize.STRING(150),
        allowNull: true,
        field: 'country'
    },
    website: {
        type: Sequelize.STRING(150),
        allowNull: true,
        field: 'website'
    },
    active: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        field: 'active',
        defaultValue: true
    }
}, { underscoredAll: true });



module.exports = Client;