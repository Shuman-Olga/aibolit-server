"use strict";

module.exports = function (sequelize, Sequelize) {
  var User = sequelize.define('users', {
    username: Sequelize.STRING,
    email: {
      type: Sequelize.STRING,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: Sequelize.STRING
  });
  return User;
};