module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define('users', {
    email: {
      type: Sequelize.STRING,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    lastname: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    firstname: Sequelize.STRING,
    patronymic: Sequelize.STRING,
    birthday: Sequelize.DATE,
    phone: Sequelize.STRING,
    snils: Sequelize.STRING,
    inn: Sequelize.STRING,
    description: Sequelize.TEXT,
    showinschedule: Sequelize.BOOLEAN,
    published: Sequelize.BOOLEAN,
  });

  return User;
};
