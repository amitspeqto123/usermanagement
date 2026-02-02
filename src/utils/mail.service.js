import dotenv from "dotenv"
dotenv.config();
import mailgun from "mailgun-js";

const mg = mailgun({
  apiKey: process.env.MAILGUN_API_KEY,
  domain: process.env.MAILGUN_DOMAIN,
});

export const sendMailgunEmail = async ({ to, subject, text, html }) => {
  const data = {
    from: `MyApp <noreply@${process.env.MAILGUN_DOMAIN}>`,
    to,
    subject,
    text,
    html,
  };

  return new Promise((resolve, reject) => {
    mg.messages().send(data, (error, body) => {
      if (error) reject(error);
      else resolve(body);
    });
  });
};
