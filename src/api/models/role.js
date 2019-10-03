const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Role = sequelize.define('role', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING(50),
    allowNull: false
  },
  code: {
    type: Sequelize.ENUM,
    values: ['ADMIN', 'USER']
  }
});

module.exports = Role;