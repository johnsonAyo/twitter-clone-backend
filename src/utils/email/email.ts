import nodemailer from 'nodemailer';

type emailOptions = {
  email: string;
  message: string;
  subject: string;
}

export const sendEmail = async (options: emailOptions) => {
  const transporter = nodemailer.createTransport({ host: process.env.EMAIL_HOST, port: 2525,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
  const mailOptions = {
    from: 'Tweeter Clone <naheemadedokun@gmail.com>',
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  await transporter.sendMail(mailOptions);
}
