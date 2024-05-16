const nodeMailer = require('nodemailer');

const transporter = nodeMailer.createTransport({
    host : "smtp.gmail.com",
    port: 465,
    secure: true,
    auth : {
        user: process.env.email_app_name,
        pass: process.env.email_app_password
    }
})

module.exports = transporter;