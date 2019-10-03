const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const ProjectUses = sequelize.define('ProjectUses', {
    id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: 'id'
    },
    projectId: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        field: 'project_id'
    },
    deploymentId: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        field: 'deployment_id'
    },
    softwareId: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        field: 'software_id'
    },
}, { underscoredAll: true });

module.exports = ProjectUses;