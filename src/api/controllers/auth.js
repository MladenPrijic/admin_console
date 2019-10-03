require('dotenv').config();
const { validationResult } = require('express-validator/check');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const Role = require('../models/role');

exports.signup = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(422)
        .json({ message: 'Validation faild', errors: errors.array() });
    }
    const { email, name, password, active, phone, Roles } = req.body;
    hashedPw = await bcrypt.hash(password, 12);
    const user = await User.create({
      email: email,
      password: hashedPw,
      name: name,
      active: active,
      phone: phone,
    });
    //user.setRoles(Roles.map(item=>item.id));
    return res.status(201).json({ message: 'User created!', userId: user.id });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.login = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(422)
      .json({ message: 'Validation faild', errors: errors.array() });
  }
  const email = req.body.email;
  const password = req.body.password;
  let loadedUser;
  User.findOne({ where: { email: email } })
    .then( async user => {
      if (!user) {
        res
          .status(401)
          .json({ message: 'A user with this email could not be found.' });
      }
      loadedUser = user;
      return await bcrypt.compare(password, user.password);
    })
    .then(isEqual => {
      if (!isEqual) {
       return res.status(401).json({ message: 'Wrong password!' });
      }
      const token = jwt.sign(
        {
          email: loadedUser.email,
          userId: loadedUser.id,
          verified: loadedUser.active,
          role: 'ADMIN',
        },
        process.env.SECRET,
        { expiresIn: process.env.JWT_EXP }
      );
      return res.status(200).json({ token: token });
    })
    .catch(err => {
      console.log(err);
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.password = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res
      .status(422)
      .json({ message: 'Validation faild', errors: errors.array() });
  }
  try {
    //const user = User.findByPk(req.userId);
    const password = req.body.password;
    const hashedPw = await bcrypt.hash(password, 12);
    // user.password = hashedPw;
    // user.active = true;
    //await user.update({password:hashedPw, active:true});
    await User.update(
      { password: hashedPw, active: true },
      {
        where: { id: req.userId },
        returning: true,
        plain: true,
      }
    );
    const user = await User.findByPk(req.userId, {
      attributes: ['email', 'active', 'name'],
    });
    res.status(200).json({ user });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getUserStatus = (req, res, next) => {
  User.findById(req.userId)
    .then(user => {
      if (!user) {
        const error = new Error('User not found.');
        error.statusCode = 404;
        throw error;
      }
      res.status(200).json({ status: user.status });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.updateUserStatus = (req, res, next) => {
  const newStatus = req.body.status;
  User.findById(req.userId)
    .then(user => {
      if (!user) {
        const error = new Error('User not found.');
        error.statusCode = 404;
        throw error;
      }
      user.status = newStatus;
      return user.save();
    })
    .then(result => {
      res.status(200).json({ message: 'User updated.' });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.getPagination = async (req, res, next) => {
  let limit = req.params.limit || 10; // number of records per page
  let offset = 0;
  try {
    let page = req.params.page; // page number
    offset = limit * (page - 1);
    const data = await User.findAndCountAll({
      attributes: ['id', 'email', 'name'],
      where: { active: true },
      limit: +limit,
      offset: offset,
      order: [['id', 'DESC']],
    });
    let pages = Math.ceil(data.count / +limit);
    res
      .status(200)
      .json({ result: data.rows, count: data.count, pages: pages });
  } catch (err) {
    console.log(err);
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getAll = async (req, res, next) => {
  try {
    const data = await User.findAndCountAll({
      order: [['id', 'DESC']],
      where: [{ active: true }],
    });
    res.status(200).json({ data });
  } catch (err) {
    console.log(err);
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getUser = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const user = await User.findByPk(userId, {
      attributes: { exclude: ['password'] },
      include: [{ model: Role, as: 'roles' }],
    });
    res.status(200).json({ user: user });
  } catch (err) {
    console.log(err);
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getProfile = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.userId, {
      attributes: ['email', 'phone', 'name'],
    });
    res.status(200).json({ user: user });
  } catch (err) {
    console.log(err);
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.edit = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error('Validation failed.');
      error.statusCode = 422;
      error.data = errors.array();
      throw error;
    }
    const user = await User.findByPk(req.body.id);
    if (user) {
      const userData = { ...req.body };

      delete userData.password;
      delete userData.email;
      console.log(userData);
      await User.update(userData, {
        where: { id: req.body.id },
      });
      const data = await User.findByPk(req.body.id);
      res.status(201).json({ message: 'User updated', data: data });
    } else {
      res.status(404).json({ messge: 'Not Found.' });
    }
  } catch (err) {
    console.log(err);
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.delete = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    let updated = null;
    if (user) {
      updated = await User.update(
        { active: false },
        { where: { id: req.params.id } }
      );
    }
    res.status(200).json({ updated: updated });
  } catch (err) {
    console.log(err);
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.changeProfile = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(422)
      .json({ message: 'Validation faild', errors: errors.array() });
  } else {
    try {
      const user = await User.findByPk(req.userId);
      let updated = null;
      if (user) {
        let data = { ...req.body };
        delete data.email;
        updated = await User.update(data, { where: { id: req.userId } });
      }
      res.status(201).json({ message: 'Profile was updated', data: updated });
    } catch (err) {
      console.log(err);
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }
  }
};

exports.changePassword = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(422)
      .json({ message: 'Validation faild', errors: errors.array() });
  } else {
    try {
      const user = await User.findByPk(req.userId);
      let updated = null;
      if (user) {
        hashedPw = await bcrypt.hash(req.body.newPassword, 12);
        updated = await User.update(
          { password: hashedPw },
          { where: { id: req.userId } }
        );
      }
      res.status(201).json({ message: 'Password was updated', data: updated });
    } catch (err) {
      console.log(err);
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }
  }
};

exports.reset = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(422)
      .json({ message: 'Validation faild', errors: errors.array() });
  } else {
    try {
      const user = await User.findByPk(req.body.id);
      let updated = null;
      if (user) {
        hashedPw = await bcrypt.hash(req.body.password, 12);
        updated = await User.update(
          { password: hashedPw },
          { where: { id: req.body.id } }
        );
      }
      res.status(201).json({ message: 'Password was updated', data: updated });
    } catch (err) {
      console.log(err);
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }
  }
};
