const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const Software = sequelize.define("software", {
  id: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    field: "id"
  },
  name: {
    type: Sequelize.STRING(150),
    allowNull: false,
    field: "name"
  },
  vendor: {
    type: Sequelize.STRING(150),
    allowNull: true,
    field: "vendor"
  },
  version: {
    type: Sequelize.STRING(50),
    allowNull: true,
    field: "version"
  },
  validFrom: {
    type: Sequelize.DATE,
    allowNull: true,
    field: "valid_from"
  },
  licence: {
    type: Sequelize.STRING(200),
    allowNull: true,
    field: "licence"
  },
  description: {
    type: Sequelize.STRING(2000),
    allowNull: true,
    field: "description"
  }
});

module.exports = Software;
