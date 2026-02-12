const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

// ================== REGISTER ==================
exports.register = async (req, res) => {
  try {
    const { first_name, last_name, email_id, password } = req.body;

    if (!first_name || !last_name || !email_id || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Check existing user
    const existingUser = await User.findOne({ email_id });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Create user
    const user = await User.create({
      first_name,
      last_name,
      email_id,
      password: hashedPassword,
      otp,
      otpExpiry: Date.now() + 5 * 60 * 1000, // 5 minutes
    });

    // Send OTP Email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.MAIL_USER,
      to: email_id,
      subject: "HireHelper OTP Verification",
      text: `Your OTP is ${otp}`,
    });

    res.status(201).json({
      success: true,
      message: "User registered. Please verify OTP.",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================== VERIFY OTP ==================
exports.verifyOTP = async (req, res) => {
  try {
    const { email_id, otp } = req.body;

    const user = await User.findOne({ email_id });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    console.log("DB OTP:", user.otp);
    console.log("Entered OTP:", otp);
    console.log("DB Expiry:", user.otpExpiry);
    console.log("Current Time:", Date.now());

    if (user.otp !== otp || user.otpExpiry < Date.now()) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired OTP",
      });
    }


    user.isVerified = true;
    user.otp = null;
    user.otpExpiry = null;

    await user.save();

    res.json({
      success: true,
      message: "Account verified successfully",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================== LOGIN ==================
exports.login = async (req, res) => {
  try {
    const { email_id, password } = req.body;

    const user = await User.findOne({ email_id });

    if (!user || !user.isVerified) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials or account not verified",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Incorrect password",
      });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      success: true,
      token,
      message: "Login successful",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
