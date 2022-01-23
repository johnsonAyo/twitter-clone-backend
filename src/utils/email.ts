// import nodemailer from 'nodemailer';
// import jwt from 'jsonwebtoken';

// //import {Request, Response} from 'express'

// interface emailOptions {
//   email: string;
//   message: string;
//   subject: string;
// }

// const generateEmailToken = (email: string) => {
//   const token = jwt.sign({ email }, process.env.JWT_EMAIL_KEY as string, {
//     expiresIn: process.env.JWT_EMAIL_EXPIRES_IN,
//   });
//   return token;
// };
// const sendEmail = async (email: string) => {
//   //1. create a transporter
//   if (process.env.NODE_ENV === 'production') {
//     return nodemailer.createTransport({
//       service: 'SendGrid',
//       auth: {
//         user: process.env.OUTLOOK_USERNAME,
//         pass: process.env.OUTLOOK_PASSWORD,
//       },
//     });
//   }
//   const transporter = nodemailer.createTransport({
//     host: 'smtp.mailtrap.io',
//     port: 2525,
//     secure: false,
//     requireTLS: true,
//     auth: {
//       user: process.env.EMAIL_USERNAME,
//       pass: process.env.EMAIL_PASSWORD,
//     },
//     logger: true,

//     //Activate in gmail "less secure app" option
//   });
//   //2. define the email options
//   const token = generateEmailToken(email);
//   const mailOptions = {
//     from: 'twittaz@outlook.com>',
//     to: email,
//     subject: 'Email Confirmation',
//     //text: "Press<button><a href = httHello World</strong>",
//     html: `Press <button><a href= http://localhost:3000/users/verify/${token}>here</a></button> to verify your email. Thanks`,
//   };

//   transporter.sendMail(mailOptions, function (error, response) {
//     if (error) {
//       console.log(error);
//     } else {
//       console.log('Message Sent');
//     }
//   });
// };
// //3. actually send the email

// export default sendEmail;











import nodemailer from 'nodemailer';

let transporter:any;

const sendEmail = async (email: string, subject: string, message: string) => {
  if (process.env.NODE_ENV === 'production') {
    transporter = nodemailer.createTransport({
      service: 'hotmail',
      auth: {
        user: process.env.OUTLOOK_USERNAME,
        pass: process.env.OUTLOOK_PASSWORD,
      },
  })
}
else if(process.env.NODE_ENV === 'development'){
  transporter = nodemailer.createTransport({
    host: 'smtp.mailtrap.io',
    port: 2525,
    secure: false,
    requireTLS: true,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
    logger: true,
  })
  };
  //2. define the email options
  const mailOptions = {
    from: 'twittaz@outlook.com',
    to: email,
    subject: subject,
    html: message,
  };
  transporter.sendMail(mailOptions, function (error:any) {
    if (error) {
      console.log(error);
    } else {
      console.log('Message Sent');
    }
  });
};
export default sendEmail;




