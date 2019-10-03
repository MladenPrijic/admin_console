const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Server = sequelize.define('server', {
  id: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    field: 'id',
  },
  cloudProviderId: {
    type: Sequelize.INTEGER(11),
    allowNull: true,
    field: 'cloud_provider_id',
  },
  name: {
    type: Sequelize.STRING(255),
    allowNull: false,
    field: 'name',
  },
  ip: {
    type: Sequelize.STRING(255),
    allowNull: false,
    field: 'ip',
  },
  ports: {
    type: Sequelize.STRING(255),
    allowNull: true,
    field: 'ports',
  },
  ram: {
    type: Sequelize.STRING(255),
    allowNull: true,
    field: 'ram',
  },
  cluster: {
    type: Sequelize.STRING(255),
    allowNull: true,
    field: 'cluster',
  },
  cpu: {
    type: Sequelize.STRING(255),
    allowNull: true,
    field: 'cpu',
  },
  storage: {
    type: Sequelize.STRING(255),
    allowNull: true,
    field: 'storage',
  },
  purpose: {
    type: Sequelize.STRING(2000),
    allowNull: true,
    field: 'purpose',
  },
  notes: {
    type: Sequelize.STRING(2500),
    allowNull: true,
    field: 'notes',
  },
  os: {
    type: Sequelize.STRING(255),
    allowNull: true,
    field: 'os',
  },
  version: {
    type: Sequelize.STRING(255),
    allowNull: true,
    field: 'version',
  },
  loginUrl: {
    type: Sequelize.STRING(255),
    allowNull: true,
    field: 'login_url',
  },
  instalationDate: {
    type: Sequelize.DATEONLY,
    allowNull: true,
    field: 'instalation_date',
  },
  active: {
    type: Sequelize.BOOLEAN,
    allowNull: true,
    field: 'active',
    defaultValue: true,
  }
});

module.exports = Server;
