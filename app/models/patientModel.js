module.exports = (sequelize, Sequelize) => {
  const Patient = sequelize.define('patients', {
    date: Sequelize.DATEONLY,
    lastname: Sequelize.STRING,
    firstname: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    patronymic: Sequelize.STRING,
    age: Sequelize.STRING,
    discriptions: Sequelize.TEXT,
    city: Sequelize.STRING,
    street: Sequelize.STRING,
    namestreet: Sequelize.STRING,
    house: Sequelize.STRING,
    apartment: Sequelize.STRING,
    phone: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    datecall: Sequelize.DATEONLY,
    timestart: Sequelize.STRING,
    timeend: Sequelize.STRING,
    description: Sequelize.TEXT,
    published: Sequelize.BOOLEAN,
  });

  return Patient;
};
