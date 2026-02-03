import { User } from "../models/auth.model.js";
import crypto from "crypto";
import {
  forgotPasswordService,
  loginService,
  resetPasswordService,
  signupService,
} from "../services/auth.service.js";
import ApiResponse from "../utils/ApiResponse.js";
import catchAsync from "../utils/catchAsync.js";
import { sendMailgunEmail } from "../utils/mail.service.js";
//import { transporter } from "../utils/mailer.js";

export const signupController = catchAsync(async (req, res) => {
  const user = await signupService(req.body);
  // Generate verification token
  const verificationToken = crypto.randomBytes(32).toString("hex");
  user.verificationToken = verificationToken;
  // token 24 hours valid
  user.verificationTokenExpires = Date.now() + 24 * 60 * 60 * 1000;
  await user.save();
  const verificationLink = `http://localhost:8080/v1/auth/verify-email?token=${verificationToken}`;
  await sendMailgunEmail({
    to: user.email,
    subject: "Verify your email",
    text: `Verify your email using this link: ${verificationLink}`,
    html: `
<!DOCTYPE html>
<html>
  <body style="font-family: Arial, sans-serif;">
    <h2>Email Verification</h2>
    <p>Please verify your email by clicking the button below:</p>

    <a 
      href="${verificationLink}" 
      style="
        display:inline-block;
        padding:12px 20px;
        background:#4F46E5;
        color:#ffffff;
        text-decoration:none;
        border-radius:6px;
        font-weight:bold;
      "
    >
      Verify Email
    </a>

    <p style="margin-top:20px;">
      Or copy and paste this link:<br/>
      ${verificationLink}
    </p>
  </body>
</html>
`,
  });
  res.status(201).json(
    new ApiResponse({
      statusCode: 201,
      message: "Signup successful",
      total: 1,
      data: user,
    }),
  );
});
export const loginController = catchAsync(async (req, res) => {
  const { user, token } = await loginService(req.body);
  res.status(200).json(
    new ApiResponse({
      statusCode: 200,
      data: { user, token },
      message: "Login successful",
    }),
  );
});

export const forgotPasswordController = async (req, res, next) => {
  try {
    await forgotPasswordService(req.body.email);
    res.status(200).json(
      new ApiResponse({
        statusCode: 200,
        message: "Password reset link sent to email",
      }),
    );
  } catch (error) {
    next(error);
  }
};

export const resetPasswordController = async (req, res) => {
  const { token, newPassword } = req.body;

  await resetPasswordService({ token, newPassword });

  res.status(200).json(
    new ApiResponse({
      statusCode: 200,
      message: "Password reset successful",
    }),
  );
};

export const verifyEmail = catchAsync(async (req, res) => {
  const { token } = req.query;
  const user = await User.findOne({ verificationToken: token });
  if (!user) {
    return res.status(400).json({ message: "Invalid or expired token" });
  }

  user.emailVerified = true;
  user.verificationToken = undefined;
  await user.save();

  res.json({ message: "Email verified successfully! You can now login." });
});
