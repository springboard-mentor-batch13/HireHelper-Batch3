const User = require("../models/user");
const Task = require("../models/Task");
const Request = require("../models/Request");
const Notification = require("../models/Notification");
const bcrypt = require("bcryptjs");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
const { cloudinary } = require("../config/cloudinary");
const mailSender = require("../utils/mailSender");

// ================= UPDATE PROFILE =================
exports.updateProfile = async (req, res) => {
  try {
    const userId = req.user.id || req.user._id;

    const { first_name, last_name, email_id, phone_number } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        first_name,
        last_name,
        email_id,
        phone_number,
      },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      user: updatedUser,
    });

  } catch (err) {
    console.error("Update error:", err);
    return res.status(500).json({
      success: false,
      message: "Profile update failed",
    });
  }
};

// ================= UPDATE IMAGE =================
exports.updateProfilePic = async (req, res) => {
  try {
    const userId = req.user.id || req.user._id;

    if (!req.files || !req.files.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    const file = req.files.file;
    const user = await User.findById(userId);

    // ================= DELETE OLD IMAGE =================
    if (user.profile_picture) {
      try {
        const urlParts = user.profile_picture.split("/");

        const fileName = urlParts[urlParts.length - 1]; // abc123.jpg
        const folder1 = urlParts[urlParts.length - 2];  // Profile
        const folder2 = urlParts[urlParts.length - 3];  // HireHelper

        const publicId = `${folder2}/${folder1}/${fileName.split(".")[0]}`;

        console.log("Deleting old image:", publicId);

        await cloudinary.uploader.destroy(publicId);

      } catch (err) {
        console.log("Cloudinary delete error:", err);
      }
    }

    // ================= UPLOAD NEW IMAGE =================
    const upload = await uploadImageToCloudinary(file, "HireHelper/Profile");

    user.profile_picture = upload.secure_url;
    await user.save();

    return res.status(200).json({
      success: true,
      user,
    });

  } catch (err) {
    console.error("Image error:", err);
    return res.status(500).json({
      success: false,
      message: "Image upload failed",
    });
  }
};

// ================= CHANGE PASSWORD =================
exports.changePassword = async (req, res) => {
  try {
    const userId = req.user.id || req.user._id;
    const { oldPassword, newPassword } = req.body;

    // Validate newPassword
    if (!newPassword || newPassword.trim().length < 6) {
      return res.status(400).json({
        success: false,
        message: "New password must be at least 6 characters long",
      });
    }

    const user = await User.findById(userId);

    const match = await bcrypt.compare(oldPassword, user.password);

    if (!match) {
      return res.status(400).json({
        success: false,
        message: "Wrong password",
      });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password updated",
    });

  } catch (err) {
    console.error("Password error:", err);
    return res.status(500).json({
      success: false,
      message: "Password update failed: " + err.message,
    });
  }
};


// REMOVE PROFILE PIC
exports.removeProfilePic = async (req, res) => {
  try {
    const userId = req.user.id || req.user._id;

    const user = await User.findById(userId);

    if (!user.profile_picture) {
      return res.status(400).json({
        success: false,
        message: "No profile picture found",
      });
    }

    // 🔥 FULL PUBLIC ID EXTRACT
    const urlParts = user.profile_picture.split("/");

    const fileName = urlParts[urlParts.length - 1]; // abc123.jpg
    const folder = urlParts[urlParts.length - 2];   // Profile

    const publicId = `HireHelper/${folder}/${fileName.split(".")[0]}`;

    console.log("Deleting from cloudinary:", publicId);

    await cloudinary.uploader.destroy(publicId);

    // remove from DB
    user.profile_picture = "";
    await user.save();

    return res.status(200).json({
      success: true,
      user,
    });

  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Failed to remove image",
    });
  }
};



// ================= SEND OTP =================

exports.sendChangePasswordOTP = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    user.otp = otp;
    user.otpExpiry = Date.now() + 5 * 60 * 1000;

    await user.save();

    // ✅ SEND EMAIL
    await mailSender(
      user.email_id,
      "OTP for Changing Password of Your Account on HireHelper",
      `Your OTP is ${otp}`
    );

    return res.json({
      success: true,
      message: "OTP sent to your email",
    });

  } catch (err) {
    console.error("OTP send error:", err);
    return res.status(500).json({ success: false, message: "Failed to send OTP: " + err.message });
  }
};


exports.verifyChangePasswordOTP = async (req, res) => {
  try {
    const { otp } = req.body;

    const user = await User.findById(req.user.id);

    if (!user || user.otp !== otp || user.otpExpiry < Date.now()) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired OTP",
      });
    }

    // ✅ mark verified (temporary)
    user.isOtpVerified = true;
    await user.save();

    return res.json({
      success: true,
      message: "OTP verified",
    });

  } catch (err) {
    console.error("OTP verify error:", err);
    return res.status(500).json({ success: false, message: "Failed to verify OTP: " + err.message });
  }
};


// ================= UPDATE PASSWORD =================
exports.updatePassword = async (req, res) => {
  try {
    const { newPassword } = req.body;

    const user = await User.findById(req.user.id);

    // ❌ block if OTP not verified
    if (!user.isOtpVerified) {
      return res.status(400).json({
        success: false,
        message: "OTP not verified",
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;

    // clear everything
    user.otp = null;
    user.otpExpiry = null;
    user.isOtpVerified = false;

    await user.save();

    return res.json({
      success: true,
      message: "Password updated successfully",
    });

  } catch (err) {
    console.error("Update password error:", err);
    return res.status(500).json({ success: false, message: "Failed to update password: " + err.message });
  }
};


exports.deleteAccount = async (req, res) => {
  try {
    const userId = req.user.id || req.user._id;

    const user = await User.findById(userId);

    // 🔥 1. DELETE PROFILE IMAGE (Cloudinary)
    if (user.profile_picture) {
      try {
        const urlParts = user.profile_picture.split("/");
        const fileName = urlParts[urlParts.length - 1];
        const folder1 = urlParts[urlParts.length - 2];
        const folder2 = urlParts[urlParts.length - 3];

        const publicId = `${folder2}/${folder1}/${fileName.split(".")[0]}`;

        await cloudinary.uploader.destroy(publicId);
      } catch (err) {
        console.log("Cloudinary delete error:", err);
      }
    }

    // 🔥 2. GET USER TASKS
    const tasks = await Task.find({ createdBy: userId });
    const taskIds = tasks.map((t) => t._id);

    // 🔥 3. DELETE REQUESTS ON THESE TASKS
    await Request.deleteMany({ task_id: { $in: taskIds } });

    // 🔥 4. DELETE TASKS
    await Task.deleteMany({ createdBy: userId });

    // 🔥 5. DELETE USER'S OWN REQUESTS
    await Request.deleteMany({ requester_id: userId });

    // 🔥 6. DELETE NOTIFICATIONS
    await Notification.deleteMany({ user_id: userId });

    // 🔥 7. FINALLY DELETE USER
    await User.findByIdAndDelete(userId);

    return res.json({
      success: true,
      message: "Account and all related data deleted successfully",
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Failed to delete account",
    });
  }
};