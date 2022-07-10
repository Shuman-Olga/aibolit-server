"use strict";

var Sequelize = require('sequelize');

var sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  dialect: 'mysql',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});
sequelize.authenticate().then(function () {
  return console.log('Connection has been established successfully.');
})["catch"](function (err) {
  return console.error('Connection error: ', err);
});
module.exports = sequelize;