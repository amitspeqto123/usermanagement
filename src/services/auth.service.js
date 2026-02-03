import { User } from "../models/auth.model.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/jwt.js";
import ApiError from "../utils/ApiError.js";
import crypto from "crypto";
import { PasswordReset } from "../models/passwordReset.model.js";
import { transporter } from "../utils/mailer.js";

export const signupService = async ({ email, password }) => {
  const exists = await User.findOne({ email });
  if (exists) throw new ApiError(409, "User already exists");

  const hashPassword = await bcrypt.hash(password, 10);
  return await User.create({ email, password: hashPassword });
};

export const loginService = async (data) => {
  const { email, password } = data;
  const user = await User.findOne({ email });
  if (!user) throw new ApiError(404, "User not found");
  // Email verification check
  if (!user.emailVerified) {
    throw new ApiError(403, "Please verify your email before logging in.");
  }
  const match = await bcrypt.compare(password, user.password);
  if (!match) throw new Error("Password incorrect");
  const token = generateToken(user._id, user.email);
  return { user, token };
};

export const forgotPasswordService = async (email) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("User not found");

  // generate token
  const token = crypto.randomBytes(20).toString("hex");

  // save in PasswordReset table
  await PasswordReset.create({
    userId: user._id,
    token,
    expiresAt: Date.now() + 1000 * 60 * 30, // 30 min
  });

  // send email
  const resetUrl = `http://localhost:5173/reset-password?token=${token}`;
  await transporter.sendMail({
    to: user.email,
    subject: "Password Reset",
    html: `<p>Click <a href="${resetUrl}">here</a> to reset your password.</p>`,
  });
};
export const resetPasswordService = async ({ token, newPassword }) => {
  const resetToken = await PasswordReset.findOne({ token, isUsed: false });

  if (!resetToken) {
    throw new ApiError(400, "Invalid or used token");
  }

  if (resetToken.expiresAt < new Date()) {
    throw new ApiError(400, "Token expired");
  }

  const user = await User.findById(resetToken.userId);
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  user.password = hashedPassword;
  await user.save();

  resetToken.isUsed = true;
  await resetToken.save();

  return true;
};
