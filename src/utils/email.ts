import nodemailer from 'nodemailer';
const sendEmail = async (email: string, subject: string, message: string) => {
<<<<<<< HEAD
  console.log(process.env.GMAIL_USER, process.env.GMAIL_PASS);
  console.log('chidera testing email');
=======
  // console.log(process.env.GMAIL_USER, process.env.GMAIL_PASS);
console.log('chidera testing email');
>>>>>>> ced1486b2f717e2715e52009e7272658e3fca7eb

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: `${process.env.GMAIL_USER}`,
      pass: `${process.env.GMAIL_PASS}`,
    },
  });

  let mailOptions = {
    from: `${process.env.GMAIL_USER}`,
    to: email,
    subject: subject,
    html: message,
  };

  transporter.sendMail(mailOptions, function (err, info) {
    if (err) {
      console.log(err);
      return err;
    } else {
      console.log(info);
      return info;
    }
  });
};

export default sendEmail;
