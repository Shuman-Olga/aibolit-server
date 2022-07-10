const express = require('express'),
  router = express.Router(),
  roles = require('../controllers/roleControler');

router.get('/', roles.findAll);

module.exports = router;
