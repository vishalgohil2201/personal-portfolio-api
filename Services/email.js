const nodemailer = require("nodemailer");
require("dotenv").config();
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: `${process.env.EMAIL_NAME}`,
    pass: `${process.env.APP_PASS}`
  }
});


const sendEmail = async (to, subject, text, html) => {
  const mailOptions = {
    from: process.env.EMAIL_NAME,
    to,
    subject,
    text,
    html
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
  } catch (error) {
    console.error("Error sending email: " + error);
  }
};

module.exports = sendEmail;
