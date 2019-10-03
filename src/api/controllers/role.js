const { validationResult } = require('express-validator/check');
const Role = require('../models/role');

exports.add = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const error = new Error('Validation failed.');
            error.statusCode = 422;
            error.data = errors.array();
            throw error;
        }
        const role = await Role.create({ ...req.body });
        res.status(201).json({ message: 'Role created', data: role });
    } catch (err) {
        console.log(err);
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

exports.edit = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const error = new Error('Validation failed.');
            error.statusCode = 422;
            error.data = errors.array();
            throw error;
        }
        const role = await Role.findByPk(req.body.id);
        if (role) {
            await Role.update({ ...req.body }, {
                where: { id: req.body.id }
            });
            const data = await Role.findByPk(req.body.id);
            res.status(201).json({ message: 'Role updated', data: data });
        } else {
            res.status(404).json({ messge: 'Not Found.' })
        }
    } catch (err) {
        console.log(err);
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

exports.delete = async (req, res, next) => {
    try {
        const role = await Role.destroy({
            where: {
                id: req.params.id
            }, returning: true
        })
        res.status(200).json({ delRows: role });
    } catch (err) {
        console.log(err);
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

exports.getAll = async (req, res, next) => {
    try {
        const roles = await Role.findAll();
        res.status(200).json({ roles: roles });
    } catch (err) {
        console.log(err);
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

exports.getPagination = async (req, res, next) => {
    let limit = req.params.limit || 10;   // number of records per page
    let offset = 0;
    try {
        let page = req.params.page;      // page number
        offset = limit * (page - 1);
        const data = await Role.findAndCountAll({
            attributes: ['id', 'name', 'code'],
            limit: +limit,
            offset: offset,
            order: [["id", "DESC"]]
        });
        let pages = Math.ceil(data.count / +limit);
        res.status(200).json({ 'result': data.rows, 'count': data.count, 'pages': pages });
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
        const role = await Role.findByPk(clientId);
        res.status(200).json({ role: role });
    } catch (err) {
        console.log(err);
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}