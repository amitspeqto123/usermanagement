import dotenv from "dotenv";
dotenv.config();
import nodemailer from "nodemailer";

// export const transporter = nodemailer.createTransport({
//   host: "smtp.ethereal.email",
//   port: 587,
//   auth: {
//     user: "jayce.schumm55@ethereal.email",
//     pass: "7cvXFEmPSgn6uUCbNe",
//   },
// });

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// for Verify Email after signup
export const sendEmail = async ({ to, subject, html, text }) => {
  await transporter.sendMail({
    from: `"Speqto" <amit.kumargupta@speqto.com>`,
    to,
    subject,
    text,
    html,
  });
};
