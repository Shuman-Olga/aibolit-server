const db = require('../models'),
  Patient = db.patient,
  Doctor = db.doctor,
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
  // Validate request
  console.log(req.body);
  if (!req.body.firstname) {
    res.status(400).send({
      message: 'Content can not be empty!',
    });
    return;
  }
  // Create a Patient
  // const patient = {
  //   date: req.body.date,
  //   lastname: req.body.lastname,
  //   firstname: req.body.firstname,
  //   patronymic: req.body.patronymic,
  //   age: req.body.age,
  //   discriptions: req.body.discriptions,
  //   city: req.body.city,
  //   street: req.body.street,
  //   namestreet: req.body.namestreet,
  //   house: req.body.house,
  //   apartment: req.body.apartment,
  //   phone: req.body.phone,
  //   datecall: req.body.datecall,
  //   timestart: req.body.timestart,
  //   timeend: req.body.timeend,
  //   published: req.body.published ? req.body.published : false,
  // };
  // Save Patient in the database
  Patient.create({
    date: req.body.date,
    lastname: req.body.lastname,
    firstname: req.body.firstname,
    patronymic: req.body.patronymic,
    age: req.body.age,
    discriptions: req.body.discriptions,
    city: req.body.city,
    street: req.body.street,
    namestreet: req.body.namestreet,
    house: req.body.house,
    apartment: req.body.apartment,
    phone: req.body.phone,
    datecall: req.body.datecall,
    timestart: req.body.timestart,
    timeend: req.body.timeend,
    published: req.body.published ? req.body.published : false,
  })
    .then((patient) => {
      if (req.body.doctor) {
        Doctor.findByPk(
          req.body.doctor,
          // {
          //   where: {
          //     lastname: {
          //       [Op.or]: req.body.doctor,
          //     },
          //   },
          // }
        ).then((doctor) => {
          patient.setDoctors(doctor).then(() => {
            Price.findByPk(
              req.body.price,
              // {
              //   where: {
              //     lastname: {
              //       [Op.or]: req.body.doctor,
              //     },
              //   },
              // }
            ).then((price) => {
              patient.setPrices(price).then(() => {
                res.send({ message: 'Вызов оформлен! Есть price' });
              });
            });
          });
        });
      } else {
        res.send({ message: 'Вызов оформлен!' });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while creating the Patient.',
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
  Patient.findAll({
    where: value
      ? {
          [Op.or]: [
            { lastname: { [Op.like]: `%${value}%` } },
            { firstname: { [Op.like]: `%${value}%` } },
            { phone: { [Op.like]: `${value}%` } },
            { namestreet: { [Op.like]: `%${value}%` } },
            { date: { [Op.like]: `${value}%` } },
          ],
        }
      : null,
    order: ['date'],
    include: [{ model: Doctor, attributes: ['id', 'lastname'] }, { model: Price }],
  })
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
// Find a single Patient with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  Patient.findByPk(id, {
    include: [
      {
        model: Doctor,
        as: 'doctors',
        attributes: ['id', 'lastname'],
        through: {
          attributes: [],
        },
      },
    ],
  })
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Patient with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error retrieving Patient with id=' + id,
      });
    });
};
// Update a Patient by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  Patient.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: 'Patient was updated successfully.',
        });
      } else {
        res.send({
          message: `Cannot update Patient with id=${id}. Maybe Patient was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error updating Patient with id=' + id,
      });
    });
};
// Delete a Patient with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  Patient.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: 'Patient was deleted successfully!',
        });
      } else {
        res.send({
          message: `Cannot delete Patient with id=${id}. Maybe Patient was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Could not delete Patient with id=' + id,
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
  Patient.findAll({ where: { published: true } })
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
