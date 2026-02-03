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
  //Send welcome email via Mailgun (async side effect)
  const result = await sendMailgunEmail({
    to: user.email,
    subject: "Welcome to MyApp!",
    text: `Hi, your registration was successful. Welcome aboard!`,
    html: `<p>Hi, your registration was <strong>successful</strong>. Welcome aboard!</p>`,
  }).catch((err) => {
    console.log("Mailgun error:", err.message);
  });
  console.log("Mail gun result", result);
  // await transporter.sendMail({
  //   from: "amit.kumargupta@speqto.com",
  //   to: user.email,
  //   subject: "Welcome",
  //   text: "Registration successful",
  // });
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
