import mongoose from "mongoose";
const userSechema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  }
}, {timestamps: true});

export const User = mongoose.model("User", userSechema);