"use strict";

var db = require('../models'),
    // User = db.user,
Role = db.role,
    Op = db.Sequelize.Op; // const getPagination = (page, size) => {
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


exports.findAll = function (req, res) {
  // const lastname:
  // const { page, size, firstname } = req.query;
  var value = req.query.value; // var condition = value ? { lastname: { [Op.like]: `%${value}%` } } : null;
  // const { limit, offset } = getPagination(page, size);

  Role.findAll().then(function (data) {
    // const response = getPagingData(data, page, limit);
    res.send(data);
  })["catch"](function (err) {
    res.status(500).send({
      message: err.message || 'Some error occurred while retrieving Patients.'
    });
  });
}; // // Find a single Patient with an id
// exports.findOne = (req, res) => {
//   const id = req.params.id;
//   Patient.findByPk(id, {
//     include: [
//       {
//         model: Doctor,
//         as: 'doctors',
//         attributes: ['id', 'lastname'],
//         through: {
//           attributes: [],
//         },
//       },
//     ],
//   })
//     .then((data) => {
//       if (data) {
//         res.send(data);
//       } else {
//         res.status(404).send({
//           message: `Cannot find Patient with id=${id}.`,
//         });
//       }
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message: 'Error retrieving Patient with id=' + id,
//       });
//     });
// };
// // Update a Patient by the id in the request
// exports.update = (req, res) => {
//   const id = req.params.id;
//   Patient.update(req.body, {
//     where: { id: id },
//   })
//     .then((num) => {
//       if (num == 1) {
//         res.send({
//           message: 'Patient was updated successfully.',
//         });
//       } else {
//         res.send({
//           message: `Cannot update Patient with id=${id}. Maybe Patient was not found or req.body is empty!`,
//         });
//       }
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message: 'Error updating Patient with id=' + id,
//       });
//     });
// };
// // Delete a Patient with the specified id in the request
// exports.delete = (req, res) => {
//   const id = req.params.id;
//   Patient.destroy({
//     where: { id: id },
//   })
//     .then((num) => {
//       if (num == 1) {
//         res.send({
//           message: 'Patient was deleted successfully!',
//         });
//       } else {
//         res.send({
//           message: `Cannot delete Patient with id=${id}. Maybe Patient was not found!`,
//         });
//       }
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message: 'Could not delete Patient with id=' + id,
//       });
//     });
// };
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
// exports.findAllPublished = (req, res) => {
//   // const { page, size } = req.query;
//   // const { limit, offset } = getPagination(page, size);
//   Patient.findAll({ where: { published: true } })
//     .then((data) => {
//       // const response = getPagingData(data, page, limit);
//       res.send(data);
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message: err.message || 'Some error occurred while retrieving Patients.',
//       });
//     });
// };