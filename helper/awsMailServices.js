const AWS = require("aws-sdk");
var nodemailer = require("nodemailer");
var smtpTransport = require("nodemailer-smtp-transport");

let sendEmail = async (recipientEmail, mailTemplate) => {
  let transporter = nodemailer.createTransport({
    host: 'email-smtp.ap-south-1.amazonaws.com',
    port: 465,
    secure: true, // true for 465, false for other ports 587 //443
    auth: {
      user: process.env.AWS_AccessKeySES || 'AKIASAL3MHFLJXFSBGI2',
      pass:
        process.env.AWS_SecretAccessKeySES ||
        'BIyeuWNhqK8yM2HuaY3xXwJXuOrg1OYki9pIGJJnCU8P',
    },
  });
  // send mail with defined transport object
  let response = await transporter.sendMail({
    from: 'contact@mamypoko.co.in',
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
