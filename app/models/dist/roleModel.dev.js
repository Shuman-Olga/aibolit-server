"use strict";

module.exports = function (sequelize, Sequelize) {
  var Role = sequelize.define('roles', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    rolename: Sequelize.STRING,
    name: Sequelize.STRING
  });
  return Role;
};