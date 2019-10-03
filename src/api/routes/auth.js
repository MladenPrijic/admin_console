const express = require('express');
const { body } = require('express-validator/check');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const authController = require('../controllers/auth');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

/**
 * @typedef Login
 * @property {string} email.required
 * @property {string} password.required
 */

/**
 * @route POST /auth/signup
 * @group Auth - Operations about user
 * @param {Login.model} login.body.required
 * @returns {object} 200 - An array of user info
 * @returns {Error}  default - Unexpected error
 */
router.post(
  '/signup',
  [
    body('email')
      .isEmail()
      .withMessage('Please enter a valid email.')
      .custom((value, { req }) => {
        return User.findOne({ where: { email: value } }).then(userDoc => {
          if (userDoc) {
            return Promise.reject('E-Mail address already exists!');
          }
        });
      })
      .normalizeEmail(),
    body('password')
      .trim()
      .isLength({ min: 5 })
      .withMessage('Password is requered.'),
    body('name')
      .trim()
      .not()
      .isEmpty()
      .withMessage('Name is requered.'),
  ],
  authController.signup
);
/**
 * @typedef Login
 * @property {string} email.required
 * @property {string} password.required
 */

/**
 * @route POST /auth/login
 * @group Auth - Operations about user
 * @param {Login.model} login.body.required
 * @returns {object} 200 - An array of user info
 * @returns {Error}  default - Unexpected error
 */
router.post(
  '/login',
  [
    body('email')
      .isEmail()
      .withMessage('Please enter a valid email.')
      .normalizeEmail(),
    body('password')
      .trim()
      .isLength({ min: 5 })
      .withMessage('Password must have minimal 5 characters.'),
  ],
  authController.login
);

/**
 * @route GET /auth/status
 * @group Auth - Operations about user
 * @returns {object} 200 - An array of user info
 * @returns {Error}  default - Unexpected error
 * @security Bearer
 */
router.get('/status', isAuth, authController.getUserStatus);

/**
 * @typedef Status
 * @property {string} status.required
 */
/**
 * @route PATCH /auth/status
 * @group Auth - Operations about user
 * @param {Status.model} status.body.required
 * @returns {object} 200 - An array of user info
 * @returns {Error}  default - Unexpected error
 * @security Bearer
 */
router.patch(
  '/status',
  isAuth,
  [
    body('status')
      .trim()
      .not()
      .isEmpty(),
  ],
  authController.updateUserStatus
);

/**
 * @typedef EditLogin
 * @property {string} email.required
 * @property {string} name.required
 */
/**
 * @route POST /auth/edit
 * @group Auth - Operations about user
 * @param {EditLogin.model} EditLogin.body.required
 * @returns {object} 200 - An array of user info
 * @returns {Error}  default - Unexpected error
 * @security Bearer
 */

router.post(
  '/edit',
  isAuth,
  [
    body('email')
      .isEmail()
      .withMessage('Please enter a valid email.')
      .normalizeEmail(),
    body('name')
      .trim()
      .not()
      .isEmpty()
      .withMessage('Name is requered.'),
  ],
  authController.edit
);

/**
 * @typedef Password
 * @property {string} password.required
 * @property {string} repeatPassword.required
 */
/**
 * @route POST /auth/password
 * @group Auth - Operations about user
 * @param {Password.model} EditLogin.body.required
 * @returns {object} 200 - An array of user info
 * @returns {Error}  default - Unexpected error
 * @security Bearer
 */
router.post(
  '/password',
  isAuth,
  [
    body('password')
      .trim()
      .isLength({ min: 5 })
      .withMessage('Password must have minimal 5 characters.'),
    body(
      'repeatPassword',
      'repeatPassword field must have the same value as the password field'
    )
      .exists()
      .custom((value, { req }) => value === req.body.password),
  ],
  authController.password
);

/**
 * @typedef ChangePassword
 * @property {string} currentPassword.required
 * @property {string} newPassword.required
 */
/**
 * @route POST /auth/change-password
 * @group Auth - Operations about user
 * @param {ChangePassword.model} EditLogin.body.required
 * @returns {object} 200 - An array of user info
 * @returns {Error}  default - Unexpected error
 * @security Bearer
 */

router.post(
  '/change-password',
  isAuth,
  [
    body('currentPassword')
      .trim()
      .isLength({ min: 5 })
      .withMessage('Previous password must have minimal 5 characters.')
      .custom((value, { req }) => {
        return User.findOne({ where: { id: req.userId } }).then(
          async userDoc => {
            const isOk = await bcrypt.compare(value, userDoc.password);
            console.log(isOk);
            if (!isOk) {
              return Promise.reject('This is not exsisting password.');
            }
          }
        );
      }),
    body('newPassword')
      .trim()
      .isLength({ min: 5 })
      .withMessage('New password must have minimal 5 characters.'),
    body(
      'repeatNewPassword',
      'Repeat new password field must have the same value as the new password field'
    )
      .exists()
      .custom((value, { req }) => value === req.body.newPassword),
  ],
  authController.changePassword
);

/**
 * @typedef ResetPassword
 * @property {string} password.required
 * @property {string} reTypePassword.required
 */
/**
 * @route POST /auth/reset
 * @group Auth - Operations about user
 * @param {ChangePassword.model} EditLogin.body.required
 * @returns {object} 200 - An array of user info
 * @returns {Error}  default - Unexpected error
 * @security Bearer
 */
router.post(
  '/reset',
  isAuth,
  [
    body('password')
      .trim()
      .isLength({ min: 5 })
      .withMessage('Previous password must have minimal 5 characters.'),
    body('reTypePassword')
      .trim()
      .isLength({ min: 5 })
      .withMessage('New password must have minimal 5 characters.'),
    body(
      'reTypePassword',
      'Repeat new password field must have the same value as the new password field'
    )
      .exists()
      .custom((value, { req }) => value === req.body.password),
  ],
  authController.reset
);

/**
 * @typedef ChangeProfile
 * @property {string} name.required
 * @property {string} email.required
 */
/**
 * @route POST /auth/change-profile
 * @group Auth - Operations about user
 * @param {ChangeProfile.model} EditLogin.body.required
 * @returns {object} 200 - An array of user info
 * @returns {Error}  default - Unexpected error
 * @security Bearer
 */
router.post(
  '/change-profile',
  isAuth,
  [
    body('name')
      .trim()
      .isLength({ min: 5 })
      .withMessage('Name must have minimal 5 characters.'),
    body('email')
      .isEmpty()
      .withMessage('Email must be empty.'),
  ],
  authController.changeProfile
);

/**
 * @route GET /auth/profile
 * @group Auth - Operations about user
 * @returns {object} 200 - An array of user info
 * @returns {Error}  default - Unexpected error
 * @security Bearer
 */
router.get('/profile', isAuth, authController.getProfile);

/**
 * @route GET /auth/getAll
 * @group Auth - Operations about user
 * @returns {object} 200 - An array of user info
 * @returns {Error}  default - Unexpected error
 * @security Bearer
 */
router.get('/getAll', isAuth, authController.getAll);

/**
 * @route GET /auth/{userId}
 * @group Auth - Operations about user
 * @param {integer} userId.path
 * @returns {object} 200 - An array of user info
 * @returns {Error}  default - Unexpected error
 * @security Bearer
 */
router.get('/:userId', isAuth, authController.getUser);



//router.get('/page/:page/:limit*?', isAuth, authController.getPagination);
/**
 * @route GET /auth/delete/{id}
 * @group Auth - Operations about user
 * @param {integer} id.path
 * @returns {object} 200 - An array of user info
 * @returns {Error}  default - Unexpected error
 * @security Bearer
 */
router.delete('/delete/:id', isAuth, authController.delete);

module.exports = router;
