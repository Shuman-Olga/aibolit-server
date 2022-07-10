"use strict";

module.exports = function (sequelize, Sequelize) {
  var Patient = sequelize.define('patients', {
    date: Sequelize.DATEONLY,
    lastname: Sequelize.STRING,
    firstname: Sequelize.STRING,
    patronymic: Sequelize.STRING,
    age: Sequelize.STRING,
    discriptions: Sequelize.STRING,
    city: Sequelize.STRING,
    street: Sequelize.STRING,
    namestreet: Sequelize.STRING,
    house: Sequelize.STRING,
    apartment: Sequelize.STRING,
    phone: Sequelize.STRING,
    doctor: Sequelize.STRING,
    datecall: Sequelize.DATEONLY,
    timestart: Sequelize.STRING,
    timeend: Sequelize.STRING,
    published: Sequelize.BOOLEAN
  });
  return Patient;
};