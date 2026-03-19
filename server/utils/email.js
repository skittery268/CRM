const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "d16fb849d1e1cc",
        pass: "50615d5095f916"
    }
})

const sendMail = (to, subject, html) => {
    transporter.sendMail({ to, subject, html });
}

module.exports = sendMail;