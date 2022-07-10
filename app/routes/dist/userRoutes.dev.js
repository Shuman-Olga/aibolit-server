// const { authJwt } = require('../middlewares'),
//   express = require('express'),
//   router = express.Router(),
//   controller = require('../controllers/userController');
// // module.exports = function (app) {
// //   app.use(function (req, res, next) {
// //     res.header('Access-Control-Allow-Headers', 'x-access-token, Origin, Content-Type, Accept');
// //     next();
// //   });
// //   app.get('/api/test/all', controller.allAccess);
// //   app.get('/api/test/user', [authJwt.verifyToken], controller.userBoard);
// //   app.get('/api/test/mod', [authJwt.verifyToken, authJwt.isModerator], controller.moderatorBoard);
// //   app.get('/api/test/admin', [authJwt.verifyToken, authJwt.isAdmin], controller.adminBoard);
// // };
// router
//   .get('/all', controller.allAccess)
//   .get('/user', [authJwt.verifyToken], controller.userBoard)
//   .get('/mod', [authJwt.verifyToken, authJwt.isModerator], controller.moderatorBoard)
//   .get('/admin', [authJwt.verifyToken, authJwt.isAdmin], controller.adminBoard);
// module.exports = router;
"use strict";