const express = require('express');
const AuthController = require('../controllers/authController');

const router = express.Router();

// Ruta para el login
router.post('/login', AuthController.login);

module.exports = router;
