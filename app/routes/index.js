const express = require('express'),
  router = express.Router(),
  authRouter = require('./authRoutes'),
  userRouter = require('./userRoutes'),
  patientsRoutes = require('./patientRoutes'),
  rolesRoutes = require('./roleRoutes'),
  doctorsRoutes = require('./doctorRoutes'),
  pricesRoutes = require('./priceRoutes'),
  specializationsRoutes = require('./specializationRoutes');

// app.use(function (req, res, next) {
//     res.header('Access-Control-Allow-Headers', 'x-access-token, Origin, Content-Type, Accept');
//     next();
//   });
router.use('/', authRouter);
router.use('/roles', rolesRoutes);
router.use('/users', userRouter);
router.use('/patients', patientsRoutes);
router.use('/doctors', doctorsRoutes);
router.use('/prices', pricesRoutes);
router.use('/specializations', specializationsRoutes);

module.exports = router;
