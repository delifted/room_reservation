const nodemailer = require('nodemailer');

// Create a SMTP transporter
const transporter = nodemailer.createTransport({
    host: 'smtp-relay.brevo.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: '78e7da001@smtp-brevo.com', // Your login username
        pass: 'YaQB2Op57Xd9nbAK', // Your API key
    },
});

// Example usage to send an email
const sendEmail = async () => {
    try {
        const info = await transporter.sendMail({
            from: 'seguncrown2009@gmail.com',
            to: 'deliftedkonsult@gmail.com',
            subject: 'Test Email',
            text: 'This is a test email sent using Brevo SMTP.',
            html: '<p>This is a test email sent using Brevo SMTP.</p>',
        });
        console.log('Email sent:', info.messageId);
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

sendEmail();
