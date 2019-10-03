const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const Project = sequelize.define("project", {
  id: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    field: "id"
  },
  clientId: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
    field: "client_id"
  },
  name: {
    type: Sequelize.STRING(200),
    allowNull: true
  },
  startDate: {
    type: Sequelize.DATEONLY,
    allowNull: false,
    field: "start_date"
  },
  endDate: {
    type: Sequelize.DATEONLY,
    allowNull: true,
    field: "end_date"
  },
  active: {
    type: Sequelize.BOOLEAN,
    allowNull: true,
    field: "active",
    defaultValue: true
  },
  notes: {
    type: Sequelize.STRING(2000),
    allowNull: true
  }
});

module.exports = Project;
