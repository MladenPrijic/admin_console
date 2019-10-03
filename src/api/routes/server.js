const express = require('express');
const { body } = require('express-validator/check');

const serverController = require('../controllers/server');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.post(
    '/add',isAuth,
    [
        body('ip',)
        .not()
        .isEmpty().withMessage("ip is requred."),
        body('name')
            .trim()
            .not()
            .isEmpty().withMessage("Name is requred.")
    ],
    serverController.add
);

router.post(
    '/edit',isAuth,
    [
        body('ip',)
        .not()
        .isEmpty().withMessage("ip is requred."),
        body('name')
            .trim()
            .not()
            .isEmpty().withMessage("Name is requred.")
    ],
    serverController.edit
);

router.get(
    '/page/:page/:limit*?',isAuth,
    serverController.getPagination
);

router.get(
    '/getAll',isAuth,
    serverController.getAll
);

router.get(
    '/:serverId',isAuth,
    serverController.getServer
);

router.get(
    '/getAll',isAuth,
    serverController.getAll
);

router.get(
    '/projects/:serverId',isAuth,
    serverController.getProjectsByServerId
);

router.get(
    '/software/:serverId',isAuth,
    serverController.getSoftwareByServerId
);

router.delete(
    '/delete/:id',isAuth,
    serverController.delete
);

module.exports = router;