const { validationResult } = require('express-validator/check');
const sequelize = require('../util/database');
const Client = require('../models/client');
const Project = require('../models/project');

exports.add = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).json({ message: 'Validation faild', errors: errors });
  } else {
    try {
      const client = await Client.create(
        { ...req.body },
        { include: [{ model: Project, as: 'projects' }] }
      );
      res.status(201).json({ message: 'Client created', data: client });
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
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({ message: 'Validation faild', errors: errors });
    }
    const client = await Client.findByPk(req.body.id, {
      include: [{ model: Project, as: 'projects' }],
    });
    if (client) {
      await client.update({ ...req.body });
      //delete projects
      const delProjects = req.body.projects.filter(
        item => item.state === 'DEL'
      );
      for (const delProject of delProjects) {
        await Project.destroy({ where: { id: delProject.id } });
      }
      //update projects
      const editProjects = req.body.projects.filter(
        item => item.state === 'EDIT'
      );
      for (const editProject of editProjects) {
        await Project.update(editProject, { where: { id: editProject.id } });
      }
      //add projects
      const addProjects = req.body.projects.filter(
        item => item.state === 'ADD'
      );
      for (const addProject of addProjects) {
        await client.createProject(addProject);
      }
      //await client.createProject(req.body.projects[0]);
      const data = await Client.findByPk(req.body.id);
      res.status(201).json({ message: 'Client updated', data: data });
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
    const client = await Client.update(
      { active: false },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).json({ rowDeleted: client });
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
    const data = await Client.findAndCountAll({
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
    const data = await Client.findAndCountAll({
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
    console.log(err);
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getClient = async (req, res, next) => {
  try {
    const clientId = req.params.clientId;
    const client = await Client.findByPk(clientId, {
      include: [{ model: Project, as: 'projects' }],
    });
    res.status(200).json({ client: client });
  } catch (err) {
    console.log(err);
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getServersByClientId = async (req, res, next) => {
  try {
    const clientId = req.params.clientId;
    const servers = await sequelize.query(
      `SELECT
      s.id AS server_id,
      d.name AS deployment_name,
      s.name AS server_name,
      s.ip,
      s.cpu,
      s.ram,
      s.ports,
      s.storage
    FROM
      clients c
    JOIN projects p ON p.client_id = c.id
    JOIN project_uses pu ON pu.project_id = p.id
    JOIN deployments d ON d.id = pu.deployment_id
    JOIN deployment_server ds ON ds.deployment_id = d.id
    JOIN servers s ON s.id = ds.server_id
    WHERE
      c.id = :clientId
    GROUP BY
      s.id,d.id`,
      { replacements: { clientId: clientId }, type: sequelize.Sequelize.QueryTypes.SELECT }
    );
    res.status(200).json({ servers });
  } catch (err) {
    console.log(err);
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
