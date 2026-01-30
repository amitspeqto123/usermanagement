import {
  forgotPasswordService,
  loginService,
  resetPasswordService,
  signupService,
} from "../services/auth.service.js";
import ApiResponse from "../utils/ApiResponse.js";
import catchAsync from "../utils/catchAsync.js";

export const signupController = catchAsync(async (req, res) => {
  const user = await signupService(req.body);
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
