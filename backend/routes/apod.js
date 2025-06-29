const express = require('express');
const router = express.Router();
const apodController = require('../controllers/apodController');

// GET /api/apod - fetch Astronomy Picture of the Day
router.get('/', apodController.getAPOD);

module.exports = router;
