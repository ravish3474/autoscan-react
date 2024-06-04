const AWS = require("aws-sdk");
var nodemailer = require("nodemailer");
var smtpTransport = require("nodemailer-smtp-transport");

let sendEmail = async (recipientEmail, mailTemplate) => {
  let transporter = nodemailer.createTransport({
    host: "",
    port: 465,
    secure: true, // true for 465, false for other ports 587 //443
    auth: {
      user: process.env.AWS_AccessKeySES,
      pass: process.env.AWS_SecretAccessKeySES,
    },
  });
  // send mail with defined transport object
  let response = await transporter.sendMail({
    from: "info@autoscan.com",
    to: recipientEmail,
    subject: mailTemplate.subject,
    text: mailTemplate.text,
    html: mailTemplate.html,
  });
  return true;
};

module.exports = {
  sendEmail,
};
