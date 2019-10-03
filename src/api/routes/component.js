const express = require('express');
const { body } = require('express-validator/check');

const component = require('../models/component');
const componentController = require('../controllers/component');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

/**
 * @typedef Component
 * @property {string} name.required
 */

/**
 * @route POST /component/add
 * @group Component - Operations about component
 * @param {Component.model} name.body.required
 * @returns {object} 200 
 * @returns {Error}  default - Unexpected error
 * @security Bearer
 */
router.post(
    '/add',isAuth,
    [
        body('name')
            .trim()
            .not()
            .isEmpty().withMessage("Name is requred.")
    ],
    componentController.add
);

/**
 * @typedef ComponentEdit
 * @property {integer} id.required
 * @property {string} name.required
 */

/**
 * @route POST /component/edit
 * @group Component - Operations about component
 * @param {ComponentEdit.model} id.body.required
 * @param {ComponentEdit.model} name.body.required
 * @returns {object} 200 
 * @returns {Error}  default - Unexpected error
 * @security Bearer
 */

router.post(
    '/edit',isAuth,
    [
        body('id',)
            .isInt().withMessage("Component ID is requred."),
        body('name')
            .trim()
            .not()
            .isEmpty().withMessage("Name is requred.")
    ],
    componentController.edit
);

/**
 * @route GET /component/getAll
 * @group Component - Operations about component
 * @returns {object} 200 - An array of component info
 * @returns {Error}  default - Unexpected error
 * @security Bearer
 */
router.get(
    '/getAll',isAuth,
    componentController.getAll
);

/**
 * @route GET /component/delete/{id}
 * @group Component - Operations about component
 * @param {integer} id.path
 * @returns {object} 200 - An array of component info
 * @returns {Error}  default - Unexpected error
 * @security Bearer
 */

router.delete(
    '/delete/:id',isAuth,
    componentController.delete
);

/**
 * @route GET /component/{componentId}
 * @group Component - Operations about component
 * @param {integer} componentId.path
 * @returns {object} 200 - An array of component info
 * @returns {Error}  default - Unexpected error
 * @security Bearer
 */

router.get(
    '/:componentId',isAuth,
    componentController.getComponent
);

module.exports = router;