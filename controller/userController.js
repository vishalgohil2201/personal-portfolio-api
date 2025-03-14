var userModel = require('../model/userModel');
// var nodemailer = require('nodemailer');
var sendEmail = require("../Services/email")
require('dotenv').config();

// var transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         user: `${process.env.EMAIL_NAME}`,
//         pass: `${process.env.APP_PASS}`
//     }
// });

exports.touchUser = async (req, res) => {
    // try {
    //     let { fname, name, email, mobile_number, message } = req.body;

    //     var mailOptions = {
    //         from: `${process.env.EMAIL_NAME}`,
    //         to: `${process.env.EMAIL_NAME}`,
    //         subject: name && fname ? fname + ' ' + name : name,
    //         text: 'Name: ' + name && fname ? fname + ' ' + name : name + '\n' +
    //             'Email: ' + email + '\n' +
    //             'Phone-Number: ' + mobile_number + '\n' +
    //             'Message: ' + message,
    //     };

    //     transporter.sendMail(mailOptions, function (error, info) {
    //         if (error) {
    //             console.log(error);
    //         } else {
    //             console.log('Email sent: ' + info.response);
    //         }
    //     });

    //     let data = await userModel.create({ name: name && fname ? fname + ' ' + name : name, email, mobile_number, message });
    //     return res.status(200).json({
    //         status: "success",
    //         message: "successful submitted..!",
    //         data
    //     });
    // }
    // catch (error) {
    //     return res.status(200).json({
    //         error
    //     });
    // }

    const { firstName, lastName, name, email, phoneNumber, message } = req.body;

    if ((!name && (!firstName && !lastName)) || !email || !phoneNumber || !message) {
        return res.status(400).json({ message: "Please provide all fields: name, email, phone-number and message!" });
    }

    let Name =  !name ? firstName + ' ' + lastName : name;

    const subject = `Hello, ${Name}! Your registration details`;
    const text = `Hello ${Name},\n\nThank you for submitting your details.\n\nName: ${Name}\nEmail: ${email}\nPhone Number: ${phoneNumber}\n\nBest regards,\nYour Team`;
    const html = `
    <h1>Hello ${Name}!</h1>
    <p>Thank you for submitting your details.</p>
    <ul>
    <li>Name: ${Name}</li>
    <li>Email: ${email}</li>
    <li>Phone Number: ${phoneNumber}</li>
    <li>Message: ${message}</li>
    </ul>
    <p>Best regards,
    </p><p>Your Team</p>`;
    try {
        await sendEmail(`${process.env.EMAIL_NAME}`, subject, text, html);
        await userModel.create({ name: !name ? firstName + ' ' + lastName : name, email, mobile_number: phoneNumber, message });
        return res.status(200).json({ message: "Your details sent successfully" });

    } catch (error) {
        return res.status(500).json({ message: "Error sending your details..!", error });
    }
}

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