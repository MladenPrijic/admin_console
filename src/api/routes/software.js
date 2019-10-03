const express = require('express');
const { body } = require('express-validator/check');

const softwareController = require('../controllers/software');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.post(
    '/add',isAuth,
    softwareController.add
);

router.post(
    '/edit',isAuth,
    [
        body('id',)
            .isInt().withMessage("Client ID is requred."),
        body('name')
            .trim()
            .not()
            .isEmpty().withMessage("Name is requred.")
    ],
    softwareController.edit
);



router.get(
    '/page/:page/:limit*?',isAuth,
    softwareController.getPagination
);

router.get(
    '/getAll',isAuth,
    softwareController.getAll
);

router.get(
    '/:softwareId',isAuth,
    softwareController.getSoftware
);

router.get(
    '/projects/:softwareId',isAuth,
    softwareController.getProjectsBySoftwareId
);

router.get(
    '/servers/:softwareId',isAuth,
    softwareController.getServersBySoftwareId
);

router.delete(
    '/delete/:id',isAuth,
    softwareController.delete
);



module.exports = router;