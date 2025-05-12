var userModel = require('../model/userModel');
var sendEmail = require("../Services/email")
require('dotenv').config();

exports.touchUser = async (req, res) => {
  const { firstName, lastName, name, email, phoneNumber, message } = req.body;

  if ((!name && (!firstName || !lastName)) || !email || !phoneNumber || !message) {
    return res.status(400).json({ message: "Please provide all fields: name, email, phone number, and message!" });
  }

  const fullName = name || `${firstName} ${lastName}`;

  const subject = `Hello, ${fullName}! Your registration details`;
  const text = `Hello ${fullName},\n\nThank you for submitting your details.\n\nName: ${fullName}\nEmail: ${email}\nPhone Number: ${phoneNumber}\n\nBest regards,\nYour Team`;
  const html = `
    <h1>Hello ${fullName}!</h1>
    <p>Thank you for submitting your details.</p>
    <ul>
      <li><strong>Name:</strong> ${fullName}</li>
      <li><strong>Email:</strong> ${email}</li>
      <li><strong>Phone Number:</strong> ${phoneNumber}</li>
      <li><strong>Message:</strong> ${message}</li>
    </ul>
    <p>Best regards,<br>Your Team</p>
  `;

  try {
    await sendEmail(process.env.EMAIL_NAME, subject, text, html);
    await userModel.create({ name: fullName, email, mobile_number: phoneNumber, message });

    return res.status(200).json({ message: "Your details were sent and saved successfully." });
  } catch (error) {
    console.error("Email sending failed:", error);
    return res.status(500).json({ message: "Failed to send email.", error: error.message });
  }
};

exports.allUser = async (req, res) => {
    try {
        let all = await userModel.find();
        return res.status(200).json({
            status: "success",
            message: "all users",
            all
        });
    }
    catch (error) {
        return res.status(200).json({
            error
        });
    }
}