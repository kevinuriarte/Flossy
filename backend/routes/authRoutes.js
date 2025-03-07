const express = require('express');
const { login, getProfile } = require('../controllers/authController');
const { authenticate } = require('../config/auth');
const router = express.Router();

router.post('/login', login);
router.get('/profile', authenticate, getProfile);

module.exports = router;
