const express = require("express");
const authCustomerController = require("../../controllers/frontend/authCustomerController");

const router = express.Router();

router.post("/login", authCustomerController.login);
router.post("/jwt-forget-pwd", authCustomerController.forgotpass);
router.get("/reset-password", authCustomerController.passwordReset);
router.post("/change-password", authCustomerController.changePassword);

module.exports = router;
