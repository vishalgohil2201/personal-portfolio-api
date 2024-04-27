var userModel = require('../model/userModel');
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'computerwork424@gmail.com',
        pass: 'mvsb pjli pijk rbqm'
    }
});

exports.touchUser = async (req, res) => {
    try {
        let { name, email, mobile_number, message } = req.body;

        var mailOptions = {
            from: 'computerwork424@gmail.com',
            to: 'computerwork424@gmail.com',
            subject: name,
            text: 'Name: ' + name + '\n' +
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

        let data = await userModel.create({ name, email, mobile_number, message });
        res.status(200).json({
            status: "success",
            message: "successful submitted..!",
            data
        })
    }
    catch (error) {
        res.status(200).json({
            error
        })
    }
}

exports.allUser = async (req, res) => {
    try {
        let all = await userModel.find();
        res.status(200).json({
            status:"success",
            message:"all users",
            all
        })
    }
    catch (error) {
        res.status(200).json({
            error
        })
    }
}