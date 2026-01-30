import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: "jayce.schumm55@ethereal.email",
    pass: "7cvXFEmPSgn6uUCbNe",
  },
});
