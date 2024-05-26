
const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/login', authController.login);
router.post('/jwt-forget-pwd', authController.forgotpass);
router.get("/reset-password", authController.passwordReset);
router.post("/change-password", authController.changePassword);

module.exports = router;
