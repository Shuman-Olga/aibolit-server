"use strict";

var express = require('express'),
    router = express.Router(),
    roles = require('../controllers/roleControler');

router // .post('/', patients.create)
.get('/', roles.findAll); //   .get('/published', patients.findAllPublished)
//   .get('/:id', patients.findOne)
//   .put('/:id', patients.update)
//   .delete('/:id', patients.delete);
// // .delete('/', patients.deleteAll);

module.exports = router;