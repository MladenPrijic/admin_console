const { validationResult } = require('express-validator/check');
const Project = require('../models/project');
const Client = require('../models/client');
const ProjectUses = require('../models/project_uses');
const Deployment = require('../models/deployment');
const Software = require('../models/software');
const Server = require('../models/server');

exports.add = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw res
        .status(422)
        .json({ message: 'Validation faild', errors: errors.array() });
    }
    const project = await Project.create({ ...req.body });
    req.body.deployments.map(async item => {
      await ProjectUses.create({
        projectId: project.id,
        deploymentId: item.deploymentId,
        softwareId: item.softwareId,
      });
    });

    res.status(201).json({ message: 'Project created', data: project });
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
      res.status(422).json({ message: 'Validation faild', errors: errors });
    }
    const project = await Project.findByPk(req.body.id);
    if (project) {
      await project.update({ ...req.body });
      //del deployments
      const delDeployments = req.body.deployments.filter(
        item => item.status === 'DEL'
      );
      for (const item of delDeployments) {
        await ProjectUses.destroy({
          where: {
            id: item.id,
          },
          returning: true,
        });
      }
      const addDeployments = req.body.deployments.filter(
        item => item.status === 'ADD'
      );
      for (const item of addDeployments) {
        await ProjectUses.create({
          projectId: project.id,
          deploymentId: item.deploymentId,
          softwareId: item.softwareId,
        });
      }
      const data = await Project.findByPk(req.body.id);
      res.status(201).json({ message: 'Project updated', data: data });
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
    const delRows = await Project.destroy({
      where: {
        id: req.params.id,
      },
      returning: true,
    });
    res.status(200).json({ delRows: delRows });
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
    const data = await Project.findAndCountAll({
      order: [['id', 'DESC']],
      include: [{ model: Client, as: 'client', attributes: ['name'] }],
    });
    res.status(200).json({ data });
  } catch (err) {
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
    const data = await Project.findAndCountAll({
      attributes: ['id', 'name', 'conatactPerson', 'conatactPersonPhone'],
      limit: +limit,
      offset: offset,
      order: [['id', 'DESC']],
    });
    let pages = Math.ceil(data.count / +limit);
    res
      .status(200)
      .json({ result: data.rows, count: data.count, pages: pages });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getProject = async (req, res, next) => {
  try {
    const projectId = req.params.projectId;
    const project = await Project.findByPk(projectId, {
      attributes: ['id', 'name', 'clientId', 'startDate', 'endDate', 'notes'],
      include: [
        { model: Client, as: 'client', attributes: ['id', 'name'] },
        {
          model: ProjectUses,
          as: 'ProjectUses',
          include: [
            {
              model: Deployment,
              as: 'Deployment',
              attributes: ['id', 'name', 'type'],
              include: [{ model: Server, as:'servers' }],
            },
            {
              model: Software,
              as: 'software',
              attributes: ['id', 'name', 'version'],
            },
          ],
        },
      ],
    });
    res.status(200).json({ project: project });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
