const { createTransport } = require("nodemailer");
require("dotenv");

const SMTPConfig = {
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD
  },
};

const sendEmail = async (emailObject) => {
  const { toEmail, subject, text, html } = emailObject
  const transporter = createTransport(SMTPConfig);
  const fromEmail = SMTPConfig.auth.user;

  const mailOptions = {
    from: fromEmail,
    to: toEmail,
    subject,
    text,
    html
  };

  return transporter.sendMail(mailOptions, async (err, info) => {
    if (err) {
      console.error(
        "🚀 ~ file: email.js ~ line 19 ~ returntransporter.sendMail ~ err",
        err
      );
      return false;
    }
    console.info(info);
    return true;
  });
};

module.exports = { sendEmail };
