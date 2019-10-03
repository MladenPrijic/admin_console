const { validationResult } = require('express-validator/check');
const sequelize = require('../util/database');
const Software = require('../models/software');
const Component = require('../models/component');
const ProjectUse = require('../models/project_uses');
const Project = require('../models/project');
const Client = require('../models/client');

exports.add = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res
      .status(422)
      .json({ message: 'Validation failed.', errors: error.array() });
  } else {
    try {
      const data = { ...req.body };
      const product = await Software.create(data);
      const components = data.components.map(item => item.id);
      product.addComponents(components);
      res.status(201).json({ message: 'Software created', data: product });
    } catch (err) {
      console.log(err);
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }
  }
};

exports.edit = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res
      .status(422)
      .json({ message: 'Validation failed.', errors: error.array() });
  } else {
    try {
      const software = await Software.findById(req.body.id);
      if (software) {
        const data = { ...req.body };
        await Software.update(data, {
          where: { id: req.body.id },
        });
        const components = data.components.map(item => item.id);
        await software.setComponents(components);

        const result = await Software.findByPk(req.body.id);
        res.status(201).json({ message: 'Software updated', data: result });
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
  }
};

exports.delete = async (req, res, next) => {
  try {
    const product = await Software.destroy({
      where: {
        id: req.params.id,
      },
      returning: true,
    });
    res.status(200).json({ delRows: product });
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
    const data = await Software.findAndCountAll({
      attributes: ['id', 'name', 'version'],
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

exports.getSoftware = async (req, res, next) => {
  try {
    const softwareId = req.params.softwareId;
    const software = await Software.findByPk(softwareId, {
      include: [{ model: Component, as: 'components' }],
    });
    res.status(200).json({ software: software });
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
    const data = await Software.findAndCountAll({
      order: [['id', 'DESC']],
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

exports.getProjectsBySoftwareId = async (req, res, next) => {
  try {
    const softwareId = req.params.softwareId;
    const projects = await sequelize.query(
      `SELECT
      p.id AS project_id,
      p.name AS project_name,
      c.name AS client_name,
      c.id AS client_id
    FROM software s
      JOIN project_uses pu
        ON s.id = pu.software_id
      JOIN projects p
        ON pu.project_id = p.id
      JOIN clients c
        ON p.client_id = c.id
      WHERE s.id = :softwareId
    GROUP BY  p.id`,
      { replacements: { softwareId: softwareId }, type: sequelize.Sequelize.QueryTypes.SELECT }
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

exports.getServersBySoftwareId = async (req, res, next) => {
  try {
    const softwareId = req.params.softwareId;
    const servers = await sequelize.query(
      `SELECT DISTINCT
      s.id,
      s.name,
      s.ip,
      s.ports,
      s.storage,
      s.cpu,
      s.os,
      d.name AS deployment_name,
      d.type AS deployment_type
    FROM servers s
      JOIN deployment_server ds
        ON s.id = ds.server_id
      JOIN deployments d
        ON ds.deployment_id = d.id
      JOIN project_uses pu
        ON d.id = pu.deployment_id
      JOIN software so
        ON pu.software_id = so.id
    WHERE so.id = :softwareId`,
      { replacements: { softwareId: softwareId }, type: sequelize.Sequelize.QueryTypes.SELECT }
    );
    res.status(200).json({ servers });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};