var userModel = require('../model/userModel');
var nodemailer = require('nodemailer');
require('dotenv').config();

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: `${process.env.EMAIL_NAME}`,
        pass: `${process.env.APP_PASS}`
    }
});

exports.touchUser = async (req, res) => {
    try {
        let { fname, name, email, mobile_number, message } = req.body;

        var mailOptions = {
            from: `${process.env.EMAIL_NAME}`,
            to: `${process.env.EMAIL_NAME}`,
            subject: name && fname ? fname + ' ' +name : name,
            text: 'Name: ' + name && fname ? fname + ' ' +name : name + '\n' +
                'Email: ' + email + '\n' +
                'Phone-Number: ' + mobile_number + '\n' +
                'Message: ' + message,
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });

        let data = await userModel.create({ name: name && fname ? fname + ' ' +name : name, email, mobile_number, message });
        res.status(200).json({
            status: "success",
            message: "successful submitted..!",
            data
        });
    }
    catch (error) {
        res.status(200).json({
            error
        });
    }
}

exports.allUser = async (req, res) => {
    try {
        let all = await userModel.find();
        res.status(200).json({
            status: "success",
            message: "all users",
            all
        });
    }
    catch (error) {
        res.status(200).json({
            error
        });
    }
}