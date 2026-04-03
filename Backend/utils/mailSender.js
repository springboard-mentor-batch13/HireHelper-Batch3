const nodemailer = require("nodemailer");

const mailSender = async (email, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // TLS
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
  connectionTimeout: 20000, // increase timeout
});

await transporter.verify();
    console.log("SMTP connected successfully");
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
    console.log("MAIL USER:", process.env.MAIL_USER);
console.log("SENDING TO:", email);

    return info;

  } catch (error) {
    console.log("MAIL ERROR FULL:", error); // 🔥 full error print karo
    throw error;
  }
};

module.exports = mailSender;