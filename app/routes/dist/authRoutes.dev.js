"use strict";

var _require = require('../middlewares'),
    verifySignUp = _require.verifySignUp,
    express = require('express'),
    router = express.Router(),
    controller = require('../controllers/authController'); // module.exports = function (app) {
//   app.use(function (req, res, next) {
//     res.header('Access-Control-Allow-Headers', 'x-access-token, Origin, Content-Type, Accept');
//     next();
//   });
//   app.post(
//     '/api/auth/signup',
//     [verifySignUp.checkDuplicateUsernameOrEmail, verifySignUp.checkRolesExisted],
//     controller.signup,
//   );
//   app.post('/api/auth/signin', controller.signin);
// };


router.post('/register', [verifySignUp.checkDuplicateUsernameOrEmail, verifySignUp.checkRolesExisted], controller.signup).post('/login', controller.signin);
module.exports = router;