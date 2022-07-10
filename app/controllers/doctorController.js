const db = require('../models'),
  Doctor = db.doctor,
  Patient = db.patient,
  Op = db.Sequelize.Op;

exports.create = (req, res) => {
  if (!req.body.lastname) {
    res.status(400).send({
      message: 'Поле не может быть пустым',
    });
    return;
  }
  const doctor = {
    lastname: req.body.lastname,
    firstname: req.body.firstname,
    patronymic: req.body.patronymic,
    specialty: req.body.specialty,
    phone: req.body.phone,
  };
  Doctor.create(doctor)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while creating the Patient.',
      });
    });
};
exports.findAll = (req, res) => {
  // const { page, size, firstname } = req.query;
  const value = req.query.value;
  // var condition = lastname ? { lastname: { [Op.like]: `%${lastname}%` } } : null;
  // const { limit, offset } = getPagination(page, size);
  Doctor.findAll({
    where: value
      ? {
          [Op.or]: [
            { lastname: { [Op.like]: `%${value}%` } },
            { firstname: { [Op.like]: `%${value}%` } },
            { phone: { [Op.eq]: `${value}%` } },
          ],
        }
      : null,
    include: [
      {
        model: Patient,
        as: 'patients',
        attributes: ['id', 'lastname', 'firstname'],
        through: {
          attributes: [],
        },
      },
    ],
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
exports.findOne = (req, res) => {
  const id = req.params.id;
  Doctor.findByPk(id, {
    include: [
      {
        model: Patient,
        as: 'patients',
        attributes: ['id', 'lastname', 'firstname'],
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
  Doctor.update(req.body, {
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
  Doctor.destroy({
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
exports.addPatient = (doctorId, patientId) => {
  return Doctor.findByPk(doctorId)
    .then((doctor) => {
      if (!doctor) {
        console.log('Doctor not found!');
        return null;
      }
      return Patient.findByPk(patientId).then((patient) => {
        if (!patient) {
          console.log('Patient not found!');
          return null;
        }
        doctor.addPatient(patient);
        console.log(`>> added Patient id=${patient.id} to Doctor id=${doctor.id}`);
        return doctor;
      });
    })
    .catch((err) => {
      console.log('>> Error while adding Patient to Doctor: ', err);
    });
};
// exports.findAll = () => {
//   return Doctor.findAll({
//     include: [
//       {
//         model: Patient,
//         as: 'patients',
//         attributes: [
//           'id',
//           'lastname',
//           'firstname',
//           'age',
//           'discriptions',
//           'address',
//           'phone',
//           'doctor',
//           'datecall',
//           'timestart',
//           'timeend',
//         ],
//         through: {
//           attributes: [],
//         },
//       },
//     ],
//   })
//     .then((doctors) => {
//       return doctors;
//     })
//     .catch((err) => {
//       console.log('>> Error while retrieving Tags: ', err);
//     });
// };
// exports.findById = (id) => {
//   return Doctor.findByPk(id, {
//     include: [
//       {
//         model: Patient,
//         as: 'patients',
//         attributes: [
//           'id',
//           'lastname',
//           'firstname',
//           'age',
//           'discriptions',
//           'address',
//           'phone',
//           'doctor',
//           'datecall',
//           'timestart',
//           'timeend',
//         ],
//         through: {
//           attributes: [],
//         },
//       },
//     ],
//   })
//     .then((doctor) => {
//       return doctor;
//     })
//     .catch((err) => {
//       console.log('>> Error while finding Tag: ', err);
//     });
// };
// exports.addPatient = (doctorId, patientId) => {
//   return Doctor.findByPk(doctorId)
//     .then((doctor) => {
//       if (!doctor) {
//         console.log('Doctor not found!');
//         return null;
//       }
//       return Patient.findByPk(patientId).then((patient) => {
//         if (!patient) {
//           console.log('Patient not found!');
//           return null;
//         }
//         doctor.addPatient(patient);
//         console.log(`>> added Tutorial id=${patient.id} to Tag id=${doctor.id}`);
//         return doctor;
//       });
//     })
//     .catch((err) => {
//       console.log('>> Error while adding Tutorial to Tag: ', err);
//     });
// };
