// const config = require('../config/dbConfig.js);
const Sequelize = require('sequelize'),
  sequelize = require('../config/dbConfig'),
  db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require('./userModel.js')(sequelize, Sequelize);
db.role = require('./roleModel.js')(sequelize, Sequelize);
db.patient = require('./patientModel.js')(sequelize, Sequelize);
db.profile = require('./profileModel.js')(sequelize, Sequelize);
// db.doctor = require('./doctorModel.js')(sequelize, Sequelize);
db.specialization = require('./specializationModel.js')(sequelize, Sequelize);
db.price = require('./priceModel.js')(sequelize, Sequelize);

// Связи
// User-Role
db.role.belongsToMany(db.profile, {
  through: 'profile_role',
  foreignKey: 'roleId',
  otherKey: 'profileId',
});
db.profile.belongsToMany(db.role, {
  through: 'profile_role',
  foreignKey: 'profileId',
  otherKey: 'roleId',
});
// User-Profile
db.user.hasOne(db.profile);
// User-Specialization
db.specialization.hasMany(db.user, {
  foreignKey: 'specializationId',
});
db.user.belongsTo(db.specialization, {
  foreignKey: 'specializationId',
});
// User-Patient
db.user.belongsToMany(db.patient, {
  through: 'patient_doctor',
  foreignKey: 'userId',
  otherKey: 'patientId',
});
db.patient.belongsToMany(db.user, {
  through: 'patient_doctor',
  foreignKey: 'patientId',
  otherKey: 'userId',
});
// Pftient-Price
db.patient.belongsToMany(db.price, {
  through: 'patient_price',
  foreignKey: 'patientId',
  otherKey: 'priceId',
});
db.price.belongsToMany(db.patient, {
  through: 'patient_price',
  foreignKey: 'priceId',
  otherKey: 'patientId',
});

db.ROLES = ['user', 'director', 'admin', 'doctor'];

module.exports = db;
