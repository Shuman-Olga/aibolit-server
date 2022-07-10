"use strict";

var express = require('express'),
    router = express.Router(),
    authRouter = require('./authRoutes'),
    userRouter = require('./userRoutes'),
    patientsRoutes = require('./patientRoutes'),
    rolesRoutes = require('./roleRoutes');

doctorsRoutes = require('./doctorRoutes'); // app.use(function (req, res, next) {
//     res.header('Access-Control-Allow-Headers', 'x-access-token, Origin, Content-Type, Accept');
//     next();
//   });

router.use('/', authRouter);
router.use('/roles', rolesRoutes);
router.use('/users', userRouter);
router.use('/patients', patientsRoutes, function (req, res, next) {
  res.header('Access-Control-Allow-Headers', 'x-access-token, Origin, Content-Type, Accept');
  next();
});
router.use('/doctors', doctorsRoutes);
module.exports = router;