const nodemailer = require("nodemailer");

const mailSender = async (email, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
      connectionTimeout: 10000,
    });

    const info = await transporter.sendMail({
      from: process.env.MAIL_USER,
      to: email,
      subject,
      
      // ✅ BOTH ADD KARO
      text: text,         // plain text
      html: `<p>${text}</p>`  // html version
    });
    console.log("Sending OTP to:", email);
    console.log("MAIL SENT:", info.response);

    return info;

  } catch (error) {
    console.log("MAIL ERROR FULL:", error); // 🔥 full error print karo
    throw error;
  }
};

module.exports = mailSender;