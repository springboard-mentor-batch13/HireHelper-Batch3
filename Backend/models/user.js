const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    phone_number: {
      type: String,
    },
    email_id: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profile_picture: {
      type: String,
      default: "",
    },

    // Milestone 1 ke liye extra fields (OTP)
    isVerified: {
      type: Boolean,
      default: false,
    },
    otp: String,
    otpExpiry: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
