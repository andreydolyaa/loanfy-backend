const nodemailer = require('nodemailer');
const config = require('../config/data');


function sendEmail(data) {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: config.emailUN,
            pass: config.emailPW
        }
    });

    console.log('DATAAAAAAAAAAAAAA: ',data);
    var mailOptions = {
        from: 'loanfyService@gmail.com',
        to: data.email,
        subject: 'You have subscribed to loanfy newsletter!',
        html: `
        <h2>Welcome to loanfy!</h2>
        <p>You have subscribed to our newsletter!</p>
        <p>loanfy team.</p>
        `
    };


    transporter.sendMail(mailOptions, function (err, info) {
        if (err) console.log(err);
        else console.log('Email sent: ' + info.response);
    });
}

module.exports = {
    sendEmail
}