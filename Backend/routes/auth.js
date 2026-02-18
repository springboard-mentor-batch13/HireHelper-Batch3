const express = require("express");
const router = express.Router();
const { register, verifyOTP, login, resendOTP } = require("../controllers/auth");

router.post("/register", register);
router.post("/verify-otp", verifyOTP);
router.post("/resend-otp", resendOTP);
router.post("/login", login);

module.exports = router;
