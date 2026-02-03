import mongoose from "mongoose";
const userSechema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    emailVerified: {
      type: Boolean,
      default: false,
    },
    verificationToken: String,
    verificationTokenExpires: Date
  },
  { timestamps: true },
);

export const User = mongoose.model("User", userSechema);
