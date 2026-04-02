const nodemailer = require("nodemailer");

const mailSender = async (email, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    const info = await transporter.sendMail({
      from: process.env.MAIL_USER,
      to: email,
      subject,
      html:text,
    });

    return info;
  } catch (error) {
    console.log("Mail error:", error.message);
    throw error;
  }
};

module.exports = mailSender;