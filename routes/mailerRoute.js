const express = require('express');
const sendEmail = require('../mailer'); // Adjust the path to point to mailer.js
const router = express.Router();

router.post('/', async (req, res) => {
    const { to, subject, text } = req.body;

    try {
        await sendEmail(to, subject, text); // Use dynamic data from request body
        res.status(200).send({ message: 'Email sent successfully!' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).send({ message: 'Failed to send email.' });
    }
});

module.exports = router;
