import * as profileController from "../controllers/profile.controller.js";
import express from "express";
import { isAuthenticated } from "../middleware/authMiddleware.js";
import validate from "../middleware/validate.js";
import { profileValidation } from "../validations/index.js";
const router = express.Router();

router.use(isAuthenticated);

router.post(
  "/create",
  validate(profileValidation.createProfile),
  profileController.createProfileController,
);
router.get("/:id", profileController.getProfileController);
router.delete("/delete/:id", profileController.deleteProfileController);
router.put(
  "/update/:id",
  validate(profileValidation.updateMyProfile),
  profileController.updateProfileController,
);

export default router;
