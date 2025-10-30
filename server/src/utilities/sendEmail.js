import nodemailer from 'nodemailer';

// For testing, you can use Ethereal Email
export const sendEmail = async (to, subject, text) => {
  // Create a test account if no real SMTP
  const testAccount = await nodemailer.createTestAccount();

   const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // use TLS
    auth: {
      user: "jhinmunbhaskar@gmail.com",   // your Gmail
      pass: "yxwpqvfmwtcmtubo"       // the 16-character app password
    }
  });

  const info = await transporter.sendMail({
    from: '"Sales" <jhinmunbhaskar@gmail.com>',// must match your Gmail
    to,
    subject,
    text
  });

  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
};
