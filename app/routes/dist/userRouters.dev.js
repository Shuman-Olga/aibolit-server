"use strict";

var express = require('express'),
    router = express.Router(),
    users = require('../controllers/userController');

router // .post('/', patients.create)
.get('/', users.findAll); //   .get('/published', patients.findAllPublished)
//   .get('/:id', patients.findOne)
//   .put('/:id', patients.update)
//   .delete('/:id', patients.delete);
// // .delete('/', patients.deleteAll);

module.exports = router;