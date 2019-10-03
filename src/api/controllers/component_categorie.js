const { validationResult } = require('express-validator/check');
const ComponentCategorie = require('../models/component_categories');

exports.add = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const error = new Error('Validation failed.');
            error.statusCode = 422;
            error.data = errors.array();
            throw error;
        }
        const componentCategorie = await ComponentCategorie.create({ ...req.body });
        res.status(201).json({ message: 'Component categorie created', data: componentCategorie });
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
        const componentCategorie = await ComponentCategorie.findByPk(req.body.id);
        if (componentCategorie) {
            await ComponentCategorie.update({ ...req.body }, {
                where: { id: req.body.id }
            });
            const data =  await ComponentCategorie.findByPk(req.body.id);
            res.status(201).json({ message: 'ComponentCategorie updated', data: data });
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
        const delRows = await ComponentCategorie.destroy({
            where: {
                id: req.params.id
            }, returning: true
        })
        res.status(200).json({ delRows });
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
        const data = await ComponentCategorie.findAndCountAll({
            order: [["id", "DESC"]]
        });
        res.status(200).json({ data: data });
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
        const data = await ComponentCategorie.findAndCountAll({
            attributes: ['id', 'name'],
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

exports.getComponentCategorie = async (req, res, next) => {
    try {
        const componentCategorieId = req.params.componentCategorieId;
        const componentCategorie = await ComponentCategorie.findByPk(componentCategorieId);
        res.status(200).json({ data: componentCategorie });
    } catch (err) {
        console.log(err);
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

