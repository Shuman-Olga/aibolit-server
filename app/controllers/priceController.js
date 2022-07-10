const db = require('../models'),
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
exports.create = (req, res) => {
  if (!req.body.servicename || !req.body.price) {
    res.status(400).send({
      message: 'Введите наименование услуги и стоимость',
    });
    return;
  }
  Price.create({
    servicename: req.body.servicename,
    price: req.body.price,
    published: req.body.published ? req.body.published : true,
  })
    .then((price) => {
      res.send({ message: 'Услуга создана' });
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
  Price.findAll({
    where: value
      ? {
          [Op.or]: [{ servicename: { [Op.like]: `%${value}%` } }],
        }
      : null,
    order: ['servicename'],
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
  Price.findByPk(id, {
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
          message: `Нет такой услуги.`,
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
  Price.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: 'Услуга изменена',
        });
      } else {
        res.send({
          message: `Не удается обновить услугу!`,
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
  Price.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: 'Услуга удалена',
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
  Price.findAll({ where: { published: true } })
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
