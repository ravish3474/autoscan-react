const express = require("express");
const authCustomerController = require("../../controllers/frontend/authCustomerController");

const router = express.Router();

router.post("/login", authCustomerController.login);
router.post("/jwt-forget-pwd", authCustomerController.forgotpass);
router.get("/reset-password", authCustomerController.passwordReset);
router.post("/change-password", authCustomerController.changePassword);


router.post("/register", authCustomerController.register);
router.post("/verify-otp", authCustomerController.verifyotp);
router.post("/resend-otp", authCustomerController.resendOtp);
router.put("/update-customer", authCustomerController.updateCustomer);
module.exports = router;
