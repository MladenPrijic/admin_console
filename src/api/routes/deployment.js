const express = require('express');
const { body } = require('express-validator/check');

const deploymentController = require('../controllers/deployment');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

/**
 * @typedef Deployment
 * @property {string} name.required
 */

/**
 * @route POST /deployment/add
 * @group Deployment - Operations about deployment
 * @param {Deployment.model} name.body.required
 * @returns {object} 200 
 * @returns {Error}  default - Unexpected error
 * @security Bearer
 */
router.post(
    '/add',isAuth,
    [
        body('name',)
        .not()
        .isEmpty().withMessage("Name is requred."),
        body('type')
            .trim()
            .not()
            .isEmpty().withMessage("Type is requred.")
    ],
    deploymentController.add
);

/**
 * @typedef DeploymentEdit
 * @property {integer} id.required
 * @property {string} name.required
 */

/**
 * @route POST /deployment/edit
 * @group Deployment - Operations about deployment
 * @param {Deployment.model} id.body.required
 * @param {Deployment.model} name.body.required
 * @returns {object} 200 
 * @returns {Error}  default - Unexpected error
 * @security Bearer
 */

router.post(
    '/edit',isAuth,
    [
        body('name',)
        .not()
        .isEmpty().withMessage("Name is requred."),
        body('type')
            .trim()
            .not()
            .isEmpty().withMessage("Type is requred.")
    ],
    deploymentController.edit
);

// router.get(
//     '/page/:page/:limit*?',isAuth,
//     deploymentController.getPagination
// );

/**
 * @route GET /deployment/getAll
 * @group Deployment - Operations about deployment
 * @returns {object} 200 - An array of deployment info
 * @returns {Error}  default - Unexpected error
 * @security Bearer
 */

router.get(
    '/getAll',isAuth,
    deploymentController.getAll
);

/**
 * @route GET /deployment/{deploymentId}
 * @group Deployment - Operations about deployment
 * @param {integer} deploymentId.path
 * @returns {object} 200 - An array of deployment info
 * @returns {Error}  default - Unexpected error
 * @security Bearer
 */

router.get(
    '/:deploymentId',isAuth,
    deploymentController.getDeployment
);

/**
 * @route GET /deployment/delete/{id}
 * @group Deployment - Operations about deployment
 * @param {integer} id.path
 * @returns {object} 200 - An array of deployment info
 * @returns {Error}  default - Unexpected error
 * @security Bearer
 */

router.delete(
    '/delete/:id',isAuth,
    deploymentController.delete
);

module.exports = router;