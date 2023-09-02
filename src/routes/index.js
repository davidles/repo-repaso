const express = require('express');
const router = express.Router();

// Controllers
const indexController = require('../controllers/indexControllers');

router.get('/', indexController.renderHome);

module.exports = router;

