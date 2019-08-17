const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  pool: true,
  port: process.env.MAIL_SMTP_PORT,
  auth: {
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD
  }
});

transporter.verify(error => {
  if (error) {
    console.error(error);
  }
});

/**
 *
 * @param {*} emaiId
 * @param {*} subject
 * @param {*} html
 */
function email(emaiId, subject, html) {
  const message = {
    from: process.env.MAIL_SENDER,
    to: emaiId,
    subject,
    html
  };
  transporter.sendMail(message, error => {
    if (error) console.log(error);
  });
}

module.exports = email;
