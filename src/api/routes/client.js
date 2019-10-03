const express = require('express');
const { body } = require('express-validator/check');

const client = require('../models/client');
const clientController = require('../controllers/client');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

/**
 * @typedef Client
 * @property {string} name.required
 */

/**
 * @route POST /client/add
 * @group Client - Operations about client
 * @param {Client.model} name.body.required
 * @returns {object} 200 - An array of user info
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
  clientController.add
);

/**
 * @typedef ClientEdit
 * @group Client
 * @property {integer} id.required
 * @property {string} name.required
 */

/**
 * @route POST /client/edit
 * @group Client - Operations about client
 * @param {ClientEdit.model} id.body.required
 * @param {ClientEdit.model} name.body.required
 * @returns {object} 200 - An array of user info
 * @returns {Error}  default - Unexpected error
 * @security Bearer
 */
router.post(
  '/edit',
  isAuth,
  [
    body('id')
      .isInt()
      .withMessage('Client ID is requred.'),
    body('name')
      .trim()
      .not()
      .isEmpty()
      .withMessage('Name is requred.'),
  ],
  clientController.edit
);

/**
 * @route GET /client/getAll
 * @group Client - Operations about client
 * @returns {object} 200 - An array of client info
 * @returns {Error}  default - Unexpected error
 * @security Bearer
 */
router.get('/getAll', isAuth, clientController.getAll);

// router.get(
//     '/page/:page/:limit*?',isAuth,
//     clientController.getPagination
// );

/**
 * @route GET /client/{clientId}
 * @group Client - Operations about client
 * @param {integer} clientId.path
 * @returns {object} 200 - An array of client info
 * @returns {Error}  default - Unexpected error
 * @security Bearer
 */
router.get('/:clientId', isAuth, clientController.getClient);

/**
 * @route GET /client/servers/{clientId}
 * @group Client - Operations about client
 * @param {integer} clientId.path
 * @returns {object} 200 - An array of client info
 * @returns {Error}  default - Unexpected error
 * @security Bearer
 */
router.get('/servers/:clientId', isAuth, clientController.getServersByClientId);

/**
 * @route GET /client/delete/{id}
 * @group Client - Operations about client
 * @param {integer} id.path
 * @returns {object} 200 - An array of client info
 * @returns {Error}  default - Unexpected error
 * @security Bearer
 */
router.delete('/delete/:id', isAuth, clientController.delete);

module.exports = router;
