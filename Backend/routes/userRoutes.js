const express = require("express");
const router = express.Router();

const { authMiddleware } = require("../middleware/auth");

const {updateProfile,updateProfilePic,changePassword,
  removeProfilePic, sendChangePasswordOTP, verifyChangePasswordOTP, updatePassword, deleteAccount
} = require("../controllers/userController");

router.put("/update", authMiddleware, updateProfile);
router.put("/update-profile-pic", authMiddleware, updateProfilePic);
router.put("/change-password", authMiddleware, changePassword);
router.delete("/remove-profile-pic", authMiddleware, removeProfilePic);
router.post("/send-change-password-otp", authMiddleware, sendChangePasswordOTP);
router.post("/verify-change-password-otp", authMiddleware, verifyChangePasswordOTP);
router.put("/update-password", authMiddleware, updatePassword);
router.delete("/delete-account", authMiddleware, deleteAccount);

module.exports = router;