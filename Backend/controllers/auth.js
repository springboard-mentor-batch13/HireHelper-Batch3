const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mailSender = require("../utils/MailSender");

// ================== REGISTER ==================
exports.register = async (req, res) => {
  try {
    const { first_name, last_name, email_id, password, phone_number } = req.body;

    if (!first_name || !last_name || !email_id || !password || !phone_number) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const existingUser = await User.findOne({ email_id });

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Case 1: User exists AND verified
    if (existingUser && existingUser.isVerified) {
      return res.status(400).json({
        success: false,
        message: "User already registered",
      });
    }

    // Case 2: User exists BUT not verified → resend OTP
    if (existingUser && !existingUser.isVerified) {
      existingUser.otp = otp;
      existingUser.otpExpiry = Date.now() + 5 * 60 * 1000;
      await existingUser.save();

      await mailSender(
        email_id,
        "HireHelper OTP Verification",
        `Your HireHelper OTP is ${otp}`
      );

      return res.status(200).json({
        success: true,
        message: "OTP resent. Please verify your email.",
      });
    }

    // Case 3: New user
    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      first_name,
      last_name,
      email_id,
      phone_number,
      password: hashedPassword,
      otp,
      otpExpiry: Date.now() + 5 * 60 * 1000,
    });

    await mailSender(
      email_id,
      "HireHelper OTP Verification",
      `Your HireHelper OTP is ${otp}`
    );

    return res.status(201).json({
      success: true,
      message: "User registered. Please verify OTP.",
    });

  } catch (error) {
    return res.status(500).json({
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

    return res.status(200).json({
      success: true,
      message: "Account verified successfully",
    });

  } catch (error) {
    return res.status(500).json({
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

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    if (!user.isVerified) {
      return res.status(400).json({
        success: false,
        message: "Please verify your email first",
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

    return res.status(200).json({
      success: true,
      token,
      message: "Login successful",
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================== RESEND OTP ==================
exports.resendOTP = async (req, res) => {
  try {
    const { email_id } = req.body;

    if (!email_id) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    const user = await User.findOne({ email_id });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.isVerified) {
      return res.status(400).json({
        success: false,
        message: "User already verified",
      });
    }

    // generate new OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    user.otp = otp;
    user.otpExpiry = Date.now() + 5 * 60 * 1000;

    await user.save();

    await mailSender(
      email_id,
      "HireHelper OTP Verification",
      `Your HireHelper OTP is ${otp}`
    );

    return res.status(200).json({
      success: true,
      message: "OTP resent successfully",
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================== GET ME ==================
exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .select("-password -otp -otpExpiry");

    res.status(200).json({
      success: true,
      user,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// 🔹 FORGOT PASSWORD (Send Reset Link)
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    // validation
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    // check user exists (using email_id)
    const user = await User.findOne({ email_id: email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // generate token
    const token = crypto.randomUUID();

    // save token in DB with expiry (5 min)
    await User.findOneAndUpdate(
      { email_id: email },
      {
        token: token,
        resetPasswordExpires: Date.now() + 5 * 60 * 1000,
      },
      { new: true }
    );

    // create reset link (IMPORTANT: frontend URL)
    const url = `http://localhost:5173/update-password/${token}`;

    // send email
    await mailSender(
  email,
  "Reset Your Password - HireHelper",
  `
  <div style="font-family: Arial; text-align:center;">
    <h2 style="color:#2563eb;">HireHelper</h2>
    <p>Click the button below to reset your password</p>

    <a href="${url}" 
       style="
         display:inline-block;
         padding:12px 20px;
         background:#2563eb;
         color:white;
         text-decoration:none;
         border-radius:8px;
         margin-top:10px;
       ">
       Reset Password
    </a>

    <p style="margin-top:20px; font-size:12px; color:gray;">
      This link will expire in 5 minutes
    </p>
  </div>
  `
);

    return res.status(200).json({
      success: true,
      message: "Reset link sent to email",
    });

  } catch (error) {
    console.log("FORGOT PASSWORD ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Error sending reset email",
    });
  }
};



// 🔹 RESET PASSWORD (Update Password)
exports.resetPassword = async (req, res) => {
  try {
    const { password, confirmPassword, token } = req.body;

    // validation
    if (!password || !confirmPassword || !token) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Passwords do not match",
      });
    }

    // find user using token
    const user = await User.findOne({ token });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid token",
      });
    }

    // check token expiry
    if (user.resetPasswordExpires < Date.now()) {
      return res.status(400).json({
        success: false,
        message: "Token expired, please request again",
      });
    }

    // hash new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // update password + remove token
    await User.findOneAndUpdate(
      { token },
      {
        password: hashedPassword,
        token: undefined,
        resetPasswordExpires: undefined,
      },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Password updated successfully",
    });

  } catch (error) {
    console.log("RESET PASSWORD ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Error resetting password",
    });
  }
};