const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const CloudProvider = sequelize.define('cloudProvider', {
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
    shortName: {
        type: Sequelize.STRING(50),
        allowNull: true,
        field: 'short_name'
    },
    phone: {
        type: Sequelize.STRING(100),
        allowNull: true,
        field: 'phone'
    },
    address: {
        type: Sequelize.STRING(255),
        allowNull: true,
        field: 'address'
    },
    postalCode: {
        type: Sequelize.STRING(50),
        allowNull: true,
        field: 'postal_code'
    },
    city: {
        type: Sequelize.STRING(150),
        allowNull: true,
        field: 'city'
    },
    salesContactName: {
        type: Sequelize.STRING(150),
        allowNull: true,
        field: 'sales_contact_name'
    },
    salesContactPhone: {
        type: Sequelize.STRING(150),
        allowNull: true,
        field: 'sales_contact_phone'
    },
    supportContactName: {
        type: Sequelize.STRING(150),
        allowNull: true,
        field: 'support_contact_name'
    },
    supportContactPhone: {
        type: Sequelize.STRING(150),
        allowNull: true,
        field: 'support_contact_phone'
    },
    portalUrl: {
        type: Sequelize.STRING(1000),
        allowNull: true,
        field: 'portal_url'
    }
}, { underscoredAll: true });

module.exports = CloudProvider;