const express = require('express');
const { body } = require('express-validator/check');

const componentCategorieController = require('../controllers/component_categorie');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.post(
    '/add',isAuth,
    [
        body('name')
            .trim()
            .not()
            .isEmpty().withMessage("Name is requred.")
    ],
    componentCategorieController.add
);

router.post(
    '/edit',isAuth,
    [
        body('id',)
            .isInt().withMessage("Component category ID is requred."),
        body('name')
            .trim()
            .not()
            .isEmpty().withMessage("Name is requred.")
    ],
    componentCategorieController.edit
);

router.get(
    '/getAll',isAuth,
    componentCategorieController.getAll
);

router.get(
    '/page/:page/:limit*?',isAuth,
    componentCategorieController.getPagination
);

router.get(
    '/:componentCategorieId',isAuth,
    componentCategorieController.getComponentCategorie
);

router.delete(
    '/delete/:id',isAuth,
    componentCategorieController.delete
);

module.exports = router;