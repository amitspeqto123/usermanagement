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
import { sendEmail } from "../utils/mailer.js";

export const signupController = catchAsync(async (req, res) => {
  const user = await signupService(req.body);

  const verificationToken = crypto.randomBytes(32).toString("hex");

  user.verificationToken = verificationToken;
  user.verificationTokenExpires = Date.now() + 24 * 60 * 60 * 1000;

  await user.save();

  const verificationLink = `http://localhost:8080/v1/auth/verify-email?token=${verificationToken}`;
  await sendEmail({
    to: user.email,
    subject: "Verify your email",
    html: `
<!DOCTYPE html>
<html>
  <body>
    <p>Please verify your email:</p>

    <a href="${verificationLink}"
       target="_blank"
       style="
         display:inline-block;
         padding:12px 18px;
         background:#4F46E5;
         color:#ffffff;
         text-decoration:none;
         border-radius:6px;
         font-weight:bold;
       ">
      Verify Email
    </a>

    <p>
      Or copy and paste this link:<br/>
      ${verificationLink}
    </p>
  </body>
</html>
`,
  });

  res.status(201).json({
    success: true,
    message: "Signup successful. Please verify your email.",
  });
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
  const { token } = req.query;
  const { password } = req.body;

  await resetPasswordService({ token, password });

  res.status(200).json(
    new ApiResponse({
      statusCode: 200,
      message: "Password reset successful",
    }),
  );
};

export const verifyEmail = catchAsync(async (req, res) => {
  const { token } = req.query;
  const user = await User.findOne({
    verificationToken: token,
    verificationTokenExpires: { $gt: Date.now() },
  });
  if (!user) {
    return res.status(400).json({
      success: false,
      message: "Invalid or expired verification link",
    });
  }
  // if (!user) {
  //   return res.redirect("http://localhost:5173/verify?status=fail");
  // }
  user.emailVerified = true;
  user.verificationToken = undefined;
  user.verificationTokenExpires = undefined;
  await user.save();
  return res.status(200).json({
    success: true,
    message: "Email verified successfully",
  });
  // return res.redirect(
  //   "http://localhost:5173/verify?status=success"
  // );
});
