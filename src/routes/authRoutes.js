const express = require("express");
const authController = require("../controllers/authController");

const router = express.Router();

// Definir ruta POST /auth/login
router.post("/login", authController.login);

module.exports = router;
