const express = require('express');
const { body } = require('express-validator/check');

const role = require('../models/role');
const roleController = require('../controllers/role');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.post(
    '/add', [
        body('name')
            .trim()
            .not()
            .isEmpty().withMessage("Name is requred.")
    ], isAuth,
    roleController.add
);

router.post(
    '/edit', isAuth,
    [
        body('name')
            .trim()
            .not()
            .isEmpty().withMessage("Name is requred.")
    ],
    roleController.edit
);



router.get(
    '/getAll', isAuth,
    roleController.getAll
);

router.get(
    '/page/:page/:limit*?', isAuth,
    roleController.getPagination
);

router.get(
    '/:roleId', isAuth,
    roleController.getClient
);

router.delete(
    '/delete/:id', isAuth,
    roleController.delete
);

module.exports = router;