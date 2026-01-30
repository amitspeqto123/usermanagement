import { User } from "../models/auth.model.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/jwt.js";
import ApiError from "../utils/ApiError.js";

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

  const match = await bcrypt.compare(password, user.password);
  if (!match) throw new Error("Password incorrect");
  const token = generateToken(user._id, user.email);
  return { user, token };
};
