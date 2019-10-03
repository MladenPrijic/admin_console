const { validationResult } = require('express-validator/check');
const Deployment = require('../models/deployment');
const Server = require('../models/server');
const Software = require('../models/software');
const ProjectUse = require('../models/project_uses');
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
    const deployment = await Deployment.create({ ...req.body });
    await deployment.addServers([...req.body.servers].map(item => item.id));
    res
      .status(201)
      .json({ message: 'Deployment created.', deployment: deployment });
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
    const deployment = await Deployment.findById(req.body.id);
    if (deployment) {
      const rowsAffected = await deployment.update({ ...req.body });
      await deployment.setServers([...req.body.servers].map(item => item.id));
      res
        .status(201)
        .json({ message: 'Deployment updated', rowsAffected: rowsAffected });
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
    const deployment = await Deployment.update(
      { active: false },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).json({ rowDeleted: deployment });
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
    const data = await Deployment.findAndCountAll({
      order: [['id', 'DESC']],
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
    const data = await Deployment.findAndCountAll({
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

exports.getDeployment = async (req, res, next) => {
  try {
    const deploymentId = req.params.deploymentId;
    const data = await Deployment.findByPk(deploymentId, {
      include: [
        {
          model: Server,
          as: 'servers',
        },
        {
          model: ProjectUse,
          include: [{ model: Software, as: 'software' }, {model:Project, as:'project', include:[
            {model:Client, as:'client'}
          ]}],
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
