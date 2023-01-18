const nodemailer = require("nodemailer");
const dotenv = require('dotenv');
dotenv.config();
module.exports = async({ from, to, subject,text, html }) =>{
  const transporter = nodemailer.createTransport({
    host:process.env.SMTP_HOST,
    port:process.env.SMTP_PORT,
    secure:false,
    auth: {
      user: process.env.USER,
      pass: process.env.PASSWORD,
    },
  });
  let info = await transporter.sendMail({
    from,
    to,
    subject,
    text,
    html
  })
}
