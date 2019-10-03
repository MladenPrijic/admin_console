const { validationResult } = require('express-validator/check');
const CloudProvider = require('../models/cloud_provider');

exports.add = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const error = new Error('Validation failed.');
            error.statusCode = 422;
            error.data = errors.array();
            throw error;
        }
        const cloudProvider = await CloudProvider.create({ ...req.body });
        res.status(201).json({ message: 'CloudProvider created', data: cloudProvider });
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
            throw res.status(422).json({ messge: 'Validation failed.', errors: errors.array() })
        }
        const cloudProvider = await CloudProvider.findByPk(req.body.id);
        if (cloudProvider) {
            await cloudProvider.update({ ...req.body }, {
                where: { id: req.body.id }
            });
            const data = await CloudProvider.findByPk(req.body.id);
            res.status(201).json({ message: 'CloudProvider updated', data: data });
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
        const cloudProvider = await CloudProvider.destroy({
            where: {
                id: req.params.id
            }, returning: true
        })
        res.status(200).json({ delRows: cloudProvider });
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
        const data = await CloudProvider.findAndCountAll({order: [["id", "DESC"]]});
        res.status(200).json({ data });
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
        const data = await CloudProvider.findAndCountAll({
            attributes: ['id', 'short_name', 'phone'],
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

exports.getCloudProvider = async (req, res, next) => {
    try {
        const cloudProviderId = req.params.id;
        const cloudProvider = await CloudProvider.findByPk(cloudProviderId);
        return res.status(200).json({ cloudProvider });
    } catch (err) {
        console.log(err);
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}