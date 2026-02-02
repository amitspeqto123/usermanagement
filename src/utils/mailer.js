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
    user: "amit.kumargupta@speqto.com",
    pass: "dphi kirt nuxh emol",
  },
});