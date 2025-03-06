const express = require('express');
const { getPatients, getAppointments, createAppointment } = require('../controllers/openDentalController');
const { authenticate } = require('../config/auth');

const router = express.Router();

router.get('/patients', authenticate, getPatients);
router.get('/appointments', authenticate, getAppointments);
router.post('/appointments', authenticate, createAppointment);

module.exports = router;
