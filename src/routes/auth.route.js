import express from "express";
import {
  forgotPasswordController,
  loginController,
  resetPasswordController,
  signupController,
  verifyEmail,
} from "../controllers/auth.controller.js";
import { authValidation } from "../validations/auth.validation.js";
import validate from "../middleware/validate.js";

const router = express.Router();

router.post("/signup", validate(authValidation.signup), signupController);
router.post("/login", validate(authValidation.login) ,loginController);
router.post("/forgot-password", validate(authValidation.forgotPassword), forgotPasswordController);
router.post("/reset-password", validate(authValidation.resetPassword), resetPasswordController);
router.get("/verify-email", verifyEmail);


export default router;
