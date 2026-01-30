import jwt from "jsonwebtoken";

export const generateToken = (id, email) => {
  return jwt.sign(
    { userId: id, email },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
};