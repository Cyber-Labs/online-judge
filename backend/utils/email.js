const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  pool: true,
  port: process.env.MAIL_SMTP_PORT,
  auth: {
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD,
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.error(error);
  }
});

const email = (emaiId, subject, html) => {
  const message = {
    from: process.env.MAIL_SENDER,
    emaiId,
    subject,
    html,
  };
  transporter.sendMail(message, (error, info) => {
    if (error) console.log(error);
  });
};

module.exports = email;
