import jwt from "jsonwebtoken";
import ApiError from "../utils/ApiError.js";
import { User } from "../models/auth.model.js";

export const isAuthenticated = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new ApiError(401, "Unauthorized: No token provided");
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // user exist check
    const user = await User.findById(decoded.userId);
    if (!user) throw new ApiError(401, "Unauthorized: User not found");

    // attach user to req
    req.user = { id: user._id, email: user.email, role: user.role };
    next();
  } catch (err) {
    next(new ApiError(401, "Unauthorized: Invalid token"));
  }
};
