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

// Test endpoint to verify email manually (for testing only)
router.get("/test-verify/:token", async (req, res) => {
  try {
    const { token } = req.params;
    const { User } = await import("../models/auth.model.js");
    
    const user = await User.findOne({ verificationToken: token });
    if (!user) {
      return res.status(400).send(`
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial; display: flex; justify-content: center; align-items: center; height: 100vh; background: #f0f0f0; }
            .container { text-align: center; background: white; padding: 40px; border-radius: 10px; }
            h1 { color: #e74c3c; }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>❌ Invalid Token</h1>
            <p>The verification token is invalid or expired.</p>
            <p><strong>Token received:</strong> ${token}</p>
          </div>
        </body>
        </html>
      `);
    }

    user.emailVerified = true;
    user.verificationToken = undefined;
    await user.save();

    res.status(200).send(`
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial; display: flex; justify-content: center; align-items: center; height: 100vh; background: #f0f0f0; }
          .container { text-align: center; background: white; padding: 40px; border-radius: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
          h1 { color: #27ae60; }
          .checkmark { font-size: 60px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="checkmark">✓</div>
          <h1>Email Verified Successfully!</h1>
          <p>Your email has been verified.</p>
          <p><strong>Email:</strong> ${user.email}</p>
          <p><strong>Verified At:</strong> ${new Date().toLocaleString()}</p>
          <a href="http://localhost:8080" style="display: inline-block; margin-top: 20px; padding: 10px 20px; background: #667eea; color: white; text-decoration: none; border-radius: 5px;">Go to Login</a>
        </div>
      </body>
      </html>
    `);
  } catch (error) {
    res.status(500).send(`<h1>Error: ${error.message}</h1>`);
  }
});

export default router;
