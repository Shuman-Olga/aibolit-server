'use strict';

// const config = require('../config/dbConfig.js);
var Sequelize = require('sequelize'),
  sequelize = require('../config/dbConfig'),
  db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.user = require('./userModel.js')(sequelize, Sequelize);
db.role = require('./roleModel.js')(sequelize, Sequelize);
db.patient = require('./patientModel.js')(sequelize, Sequelize);
db.doctor = require('./doctorModel.js')(sequelize, Sequelize);
db.role.belongsToMany(db.user, {
  through: 'user_roles',
  foreignKey: 'roleId',
  otherKey: 'userId',
});
db.user.belongsToMany(db.role, {
  through: 'user_roles',
  foreignKey: 'userId',
  otherKey: 'roleId',
});
db.doctor.belongsToMany(db.patient, {
  through: 'patient_doctor',
  // as: 'patients',
  foreignKey: 'doctorId',
  otherKey: 'patientId',
});
db.patient.belongsToMany(db.doctor, {
  through: 'patient_doctor',
  // as: 'doctors',
  foreignKey: 'patientId',
  otherKey: 'doctorId',
});
db.user.hasOne(db.doctor);
db.ROLES = ['user', 'admin', 'moderator'];
module.exports = db;
