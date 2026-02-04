import dotenv from "dotenv";
dotenv.config();
// import mailgun from "mailgun-js";

// const mg = mailgun({
//   apiKey: process.env.MAILGUN_API_KEY,
//   domain: process.env.MAILGUN_DOMAIN,
//   // host: "api.eu.mailgun.net",
// });

// export const sendMailgunEmail = async ({ to, subject, text, html }) => {
//   const data = {
//     //from: `MyApp <noreply@${process.env.MAILGUN_DOMAIN}>`,
//     from: `Mailgun Sandbox <postmaster@${process.env.MAILGUN_DOMAIN}>`,
//     to,
//     subject,
//     //text,
//     html,
//   };

//   return new Promise((resolve, reject) => {
//     mg.messages().send(data, (error, body) => {
//       if (error) reject(error);
//       else resolve(body);
//     });
//   });
// };

import formData from "form-data";
import Mailgun from "mailgun.js";

const mailgun = new Mailgun(formData);

const mg = mailgun.client({
  username: "api",
  key: process.env.MAILGUN_API_KEY,
});

export const sendMailgunEmail = async ({ to, subject, text, html }) => {
  await mg.messages.create(process.env.MAILGUN_DOMAIN, {
    from: `Verify <mailgun@${process.env.MAILGUN_DOMAIN}>`, // IMPORTANT
    to,
    subject,
    ...(html ? { html } : { text }),
    // "o:tracking": false,
    // "o:tracking-clicks": false,
    // "o:tracking-opens": false,
  });
};
