const express = require('express');
const { body } = require('express-validator/check');

const cloudProvider = require('../models/cloud_provider');
const componentController = require('../controllers/cloud_provider');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

/**
 * @typedef CloudProvider
 * @property {string} name.required
 */

/**
 * @route POST /cloud-provider/add
 * @group Cloud provider - Operations about cloud provider
 * @param {CloudProvider.model} name.body.required
 * @returns {object} 200 
 * @returns {Error}  default - Unexpected error
 * @security Bearer
 */
router.post(
  '/add',
  isAuth,
  [
    body('name')
      .trim()
      .not()
      .isEmpty()
      .withMessage('Name is requred.'),
  ],
  componentController.add
);

/**
 * @typedef CloudProviderEdit
 * @property {integer} id.required
 * @property {string} name.required
 */

/**
 * @route POST /cloud-provider/edit
 * @group Cloud provider - Operations about cloud provider
 * @param {CloudProviderEdit.model} id.body.required
 * @param {CloudProviderEdit.model} name.body.required
 * @returns {object} 200 
 * @returns {Error}  default - Unexpected error
 * @security Bearer
 */
router.post(
  '/edit',
  isAuth,
  [
    body('id')
      .isInt()
      .withMessage('Component ID is requred.'),
    body('name')
      .trim()
      .not()
      .isEmpty()
      .withMessage('Name is requred.'),
  ],
  componentController.edit
);

/**
 * @route GET /cloud-provider/getAll
 * @group Cloud provider - Operations about cloud provider
 * @returns {object} 200 - An array of cloud provider info
 * @returns {Error}  default - Unexpected error
 * @security Bearer
 */

router.get('/getAll', isAuth, componentController.getAll);


//router.get('/page/:page/:limit*?', isAuth, componentController.getPagination);

/**
 * @route GET /cloud-provider/{id}
 * @group Cloud provider - Operations about cloud provider
 * @param {integer} cloud-provider.path
 * @returns {object} 200 - An array of cloud provider info
 * @returns {Error}  default - Unexpected error
 * @security Bearer
 */

router.get('/:id', isAuth, componentController.getCloudProvider);



/**
 * @route GET /cloud-provider/delete/{id}
 * @group Cloud provider - Operations about cloud provider
 * @param {integer} cloud-provider.path
 * @returns {object} 200 - An array of cloud provider info
 * @returns {Error}  default - Unexpected error
 * @security Bearer
 */

router.delete('/delete/:id', isAuth, componentController.delete);

module.exports = router;
