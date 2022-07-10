"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var db = require('../models'),
    User = db.user,
    Role = db.role,
    Op = db.Sequelize.Op,
    jwt = require('jsonwebtoken'),
    bcrypt = require('bcryptjs'),
    secretKey = process.env.SECRET_KEY;

exports.signup = function (req, res) {
  // Save User to Database
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8)
  }).then(function (user) {
    if (req.body.roles) {
      Role.findAll({
        where: {
          name: _defineProperty({}, Op.or, req.body.roles)
        }
      }).then(function (roles) {
        user.setRoles(roles).then(function () {
          res.send({
            message: 'Пользователь зарегестрирован!'
          });
        });
      });
    } else {
      // user role = 1
      user.setRoles([1]).then(function () {
        res.send({
          message: 'Пользователь зарегестрирован!'
        });
      });
    }
  })["catch"](function (err) {
    res.status(500).send({
      message: err.message
    });
  });
};

exports.signin = function (req, res) {
  User.findOne({
    where: {
      username: req.body.username
    }
  }).then(function (user) {
    if (!user) {
      return res.status(404).send({
        message: 'Пользователь не существует.'
      });
    }

    var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: 'Пароль не верен!'
      });
    }

    var token = jwt.sign({
      id: user.id
    }, secretKey, {
      expiresIn: '24h' // 24 hours

    });
    var authorities = [];
    user.getRoles().then(function (roles) {
      roles.forEach(function (item) {
        authorities.push('ROLE_' + item.name.toUpperCase());
      });
      res.status(200).send({
        id: user.id,
        username: user.username,
        email: user.email,
        roles: authorities,
        accessToken: token
      });
    });
  })["catch"](function (err) {
    res.status(500).send({
      message: err.message
    });
  });
};