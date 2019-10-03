const { validationResult } = require('express-validator/check');
const Component = require('../models/component');
const Software = require('../models/software');
exports.add = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const error = new Error('Validation failed.');
            error.statusCode = 422;
            error.data = errors.array();
            throw error;
        }
        const component = await Component.create({ ...req.body });
        res.status(201).json({ message: 'Component created', data: component });
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
        const component = await Component.findByPk(req.body.id);
        if (component) {
            await Component.update({ ...req.body }, {
                where: { id: req.body.id }
            });
            const data =  await Component.findByPk(req.body.id);
            res.status(201).json({ message: 'Component updated', data: data });
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
        const data = await Component.destroy({
            where: {
                id: req.params.id
            }, returning: true
        })
        res.status(200).json({ delRows: data });
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
        const data = await Component.findAndCountAll({order: [["id", "DESC"]]});
        res.status(200).json({ data });
    } catch (err) {
        console.log(err);
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

exports.getComponent = async (req, res, next) => {
    try {
        const componentId = req.params.componentId;
        const component = await Component.findByPk(componentId,{include:[{ model: Software, as: 'softwares' }]});
        res.status(200).json({ data: component });
    } catch (err) {
        console.log(err);
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

