const express = require('express');
const { body } = require('express-validator/check');

const projectController = require('../controllers/project');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.post(
  '/add',
  isAuth,
  [
    body('clientId')
      .isInt()
      .withMessage('Client is requred.'),
    body('name')
      .trim()
      .not()
      .isEmpty()
      .withMessage('Name is requred.'),
    body('startDate')
      .trim()
      .not()
      .isEmpty()
      .withMessage('Start cannot be empty')
      .isISO8601('yyyy-mm-dd')
      .withMessage('Start must be in correct format yyyy:mm:dd hh:mm:ss'),
  ],
  projectController.add
);

router.post(
  '/edit',
  isAuth,
  [
    body('clientId')
      .isInt()
      .withMessage('Client is requred.'),
    body('name')
      .trim()
      .not()
      .isEmpty()
      .withMessage('Name is requred.'),
  ],
  projectController.edit
);

router.get('/getAll', isAuth, projectController.getAll);

router.get('/page/:page/:limit*?', isAuth, projectController.getPagination);

router.get('/:projectId', isAuth, projectController.getProject);

router.delete('/delete/:id', isAuth, projectController.delete);

module.exports = router;
