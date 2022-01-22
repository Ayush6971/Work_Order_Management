const { createTransport } = require("nodemailer");

const SMTPConfig = {
  service: "gmail",
  auth: {
    user: "ayushsahu76@gmail.com",
    pass: password,
  },
};

const sendEmail = async (toEmail, subject, text) => {
  const transporter = createTransport(SMTPConfig);
  const fromEmail = SMTPConfig.auth.user;

  const mailOptions = {
    from: fromEmail,
    to: toEmail,
    subject,
    text,
  };
  if (attachment != null) {
    mailOptions.attachments = attachment;
  }

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
