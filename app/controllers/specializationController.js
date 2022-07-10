const db = require('../models'),
  Specialization = db.specialization,
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
exports.create = (req, res) => {
  if (!req.body.name) {
    res.status(400).send({
      message: 'Введите название специализации ',
    });
    return;
  }
  Specialization.create({
    name: req.body.name,
    description: req.body.description,
    published: req.body.published ? req.body.published : true,
  })
    .then((data) => {
      res.send(data, { message: 'Специализация создана' });
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
  Specialization.findAll({
    where: value
      ? {
          [Op.or]: [{ name: { [Op.like]: `%${value}%` } }],
        }
      : null,
    order: ['name'],
    // include: { model: Patient },
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
  Specialization.findByPk(id, {
    // include: [
    //   {
    //     model: Patient,
    //     // attributes: ['id', 'lastname'],
    //   },
    // ],
  })
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Нет такой специализации.`,
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
  Specialization.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: 'Специализация изменена',
        });
      } else {
        res.send({
          message: `Не удается обновить специализацию!`,
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
  Specialization.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: 'Специализация удалена',
        });
      } else {
        res.send({
          message: 'Не получилось удалить',
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
  Specialization.findAll({ where: { published: true } })
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
