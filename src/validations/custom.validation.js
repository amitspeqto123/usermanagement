import Joi from "joi";
import mongoose from "mongoose";

/**
 * MongoDB ObjectId validator for Joi
 */
export const objectId = (value, helpers) => {
  // mongoose se check kar rahe hain valid ObjectId hai ya nahi
  if (!mongoose.Types.ObjectId.isValid(value)) {
    return helpers.message("Invalid MongoDB ObjectId");
  }
  return value; // valid hai to value return
};
