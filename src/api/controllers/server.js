const { validationResult } = require('express-validator/check');
const sequelize = require('../util/database');
const Server = require('../models/server');
const Deployment = require('../models/deployment');
const ProjectUses = require('../models/project_uses');
const Software = require('../models/software');
const CloudProvider = require('../models/cloud_provider');
const Project = require('../models/project');
const Client = require('../models/client');

exports.add = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw res
        .status(422)
        .json({ message: 'Validation faild', errors: errors.array() });
    }
    const server = await Server.create({ ...req.body });
    res.status(201).json({ message: 'Server created.', server: server });
  } catch (err) {
    console.log(err);
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.edit = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw res
        .status(422)
        .json({ message: 'Validation faild', errors: errors.array() });
    }
    const server = await Server.findById(req.body.id);
    if (server) {
      const rowsAffected = await server.update({ ...req.body });
      res
        .status(201)
        .json({ message: 'Server updated', rowsAffected: rowsAffected });
    } else {
      res.status(404).json({ messge: 'Not Found.' });
    }
  } catch (err) {
    console.log(err);
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.delete = async (req, res, next) => {
  try {
    const server = await Server.update(
      { active: false },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).json({ rowDeleted: server });
  } catch (err) {
    console.log(err);
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getAll = async (req, res, next) => {
  try {
    const data = await Server.findAndCountAll({
      order: [['id', 'DESC']],
      include: [
        {
          model: CloudProvider,
          as: 'cloudProvider',
        },
        {
          model: Deployment,
          as: 'deployments',
          include: [
            {
              model: ProjectUses,
              as: 'ProjectUses',
              include: [
                {
                  model: Project,
                  as: 'project',
                  include: [{ model: Client, as: 'client' }],
                },
                {
                  model: Software,
                  as: 'software',
                },
              ],
            },
          ],
        },
      ],
      where: [{ active: true }],
    });
    res.status(200).json({ data });
  } catch (err) {
    console.log(err);
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getPagination = async (req, res, next) => {
  let limit = req.params.limit || 10; // number of records per page
  let offset = 0;
  try {
    let page = req.params.page; // page number
    offset = limit * (page - 1);
    const data = await Server.findAndCountAll({
      attributes: ['id', 'name', 'ip'],
      limit: +limit,
      offset: offset,
      order: [['id', 'DESC']],
    });
    let pages = Math.ceil(data.count / +limit);
    res
      .status(200)
      .json({ result: data.rows, count: data.count, pages: pages });
  } catch (err) {
    console.log(err);
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getServer = async (req, res, next) => {
  try {
    const serverId = req.params.serverId;
    const data = await Server.findByPk(serverId, {
      include: [
        {
          model: CloudProvider,
          as: 'cloudProvider',
        },
        {
          model: Deployment,
          as: 'deployments',
          include: [
            {
              model: ProjectUses,
              as: 'ProjectUses',
              include: [
                {
                  model: Project,
                  as: 'project',
                  include: [{ model: Client, as: 'client' }],
                },
                {
                  model: Software,
                  as: 'software',
                },
              ],
            },
          ],
        },
      ],
    });
    res.status(200).json({ data });
  } catch (err) {
    console.log(err);
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getProjectsByServerId = async (req, res, next) => {
  try {
    const serverId = req.params.serverId;
    const projects = await sequelize.query(
      `SELECT
    s.id,
    p.id AS project_id,
    p.name AS project_name,
    p.client_id,
    c.name AS client_name
  FROM
    servers s
  JOIN deployment_server ds ON s.id = ds.server_id
  JOIN deployments d ON d.id = ds.deployment_id
  JOIN project_uses pu ON pu.deployment_id = d.id
  JOIN projects p ON p.id = pu.project_id
  JOIN clients c ON c.id = p.client_id
  WHERE
    s.id = :serverId
  GROUP BY
    project_id`,
      { replacements: { serverId: serverId }, type: sequelize.Sequelize.QueryTypes.SELECT }
    );
    res.status(200).json({ projects });
  } catch (err) {
    console.log(err);
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getSoftwareByServerId = async (req, res, next) => {
  try {
    const serverId = req.params.serverId;
    const software = await sequelize.query(
      `SELECT
      s.id AS server_id,
      so.id AS software_id,
      so.name AS software_name,
      so.version
    FROM
      servers s
    JOIN deployment_server ds ON ds.server_id = s.id
    JOIN deployments d ON d.id = ds.deployment_id
    JOIN project_uses pu ON pu.deployment_id = d.id
    JOIN software so ON so.id = pu.software_id
    WHERE
      s.id = :serverId`,
      { replacements: { serverId: serverId }, type: sequelize.Sequelize.QueryTypes.SELECT }
    );
    res.status(200).json({ software });
  } catch (err) {
    console.log(err);
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
