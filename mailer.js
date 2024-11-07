const nodemailer = require('nodemailer');

// Create a transporter
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587, // Port for TLS
    secure: false, // False for 587 as it's not SSL, but STARTTLS
    auth: {
        user: "harshantil7509@gmail.com", // Your email address
        pass: "bkoe cabo apbs pxnm", // Your email password or app password
    },
});

// Function to send an email
const sendEmail = (to, subject, text) => {
    const mailOptions = {
        from: "harsh.2201301022@geetauniversity.edu.in", // Sender address
        to: to, // Receiver email from request
        subject: subject, // Subject from request
        text: text, // Plain text body from request
    };

    return transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
