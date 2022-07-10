const db = require('../models'),
  Patient = db.patient,
  Doctor = db.doctor,
  User = db.user,
  Specialization = db.specialization,
  Price = db.price,
  Op = db.Sequelize.Op;

// const getPagination = (page, size) => {
//   const limit = size ? +size : 3;
//   const offset = page ? page * limit : 0;
//   return { limit, offset };
// };
// const getPagingData = (data, page, limit) => {
//   const { count: totalItems, rows: patientcontroller } = data;
//   const currentPage = page ? +page : 0;
//   const totalPages = Math.ceil(totalItems / limit);
//   return { totalItems, patients, totalPages, currentPage };
// };
// Create and Save a new Patient
exports.create = (req, res) => {
  if (!req.body.lastname) {
    res.status(400).send({
      message: 'Content can not be empty!',
    });
    return;
  }
  User.create({
    email: req.body.email,
    lastname: req.body.lastname,
    firstname: req.body.firstname,
    patronymic: req.body.patronymic,
    birthday: req.body.birthday,
    phone: req.body.phone,
    snils: req.body.snils,
    inn: req.body.inn,
    discriptions: req.body.discriptions,
    showinschedule: req.body.showinschedule,
    published: req.body.published ? req.body.published : true,
  })
    .then((user) => {
      if (req.body.specialization) {
        Specialization.findByPk(req.body.specialization).then((specialization) => {
          user.setSpecializations(specialization).then(() => {
            res.send({ message: 'Сотрудник создан' });
          });
        });
      } else {
        res.send({ message: 'Сотрудник создан' });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Ошибка',
      });
    });
};
// Retrieve all Patients from the database.
exports.findAll = (req, res) => {
  // const lastname:
  // const { page, size, firstname } = req.query;
  const value = req.query.value;
  // var condition = value ? { lastname: { [Op.like]: `%${value}%` } } : null;
  // const { limit, offset } = getPagination(page, size);
  User.findAll({
    where: value
      ? {
          [Op.or]: [
            { lastname: { [Op.like]: `%${value}%` } },
            { firstname: { [Op.like]: `%${value}%` } },
            { phone: { [Op.like]: `${value}%` } },
          ],
        }
      : null,
    order: ['lastname'],
    include: [{ model: Specialization }],
  })
    .then((data) => {
      // const response = getPagingData(data, page, limit);
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Ошибка',
      });
    });
};
// Find a single Patient with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  User.findByPk(id, {
    include: [
      {
        model: Specialization,
      },
    ],
  })
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Нет такого сотрудника`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Ошибка',
      });
    });
};
// Update a Patient by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  Гыук
    .update(req.body, {
      where: { id: id },
    })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: 'Изменения внесены',
        });
      } else {
        res.send({
          message: `Ошибка`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Ошибка',
      });
    });
};
// Delete a Patient with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  User.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: 'Сотрудник удален',
        });
      } else {
        res.send({
          message: `Ошибка`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Ошибка',
      });
    });
};
// Delete all Patients from the database.
// exports.deleteAll = (req, res) => {
//   Patient.destroy({
//     where: {},
//     truncate: false,
//   })
//     .then((nums) => {
//       res.send({ message: `${nums} Patients were deleted successfully!` });
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message: err.message || 'Some error occurred while removing all Patients.',
//       });
//     });
// };
// Find all published Patients
exports.findAllPublished = (req, res) => {
  // const { page, size } = req.query;
  // const { limit, offset } = getPagination(page, size);
  User.findAll({ where: { published: true } })
    .then((data) => {
      // const response = getPagingData(data, page, limit);
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving Patients.',
      });
    });
};

exports.findAllsSchedule = (req, res) => {
  // const { page, size } = req.query;
  // const { limit, offset } = getPagination(page, size);
  User.findAll({ where: { showinschedule: true } })
    .then((data) => {
      // const response = getPagingData(data, page, limit);
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Ошибка',
      });
    });
};
