
import * as profileController from "../controllers/profile.controller.js";
import express from "express"
import { isAuthenticated } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.use(isAuthenticated);

router.post("/create", profileController.createProfileController);
router.get("/:id", profileController.getProfileController);
router.delete("/delete/:id", profileController.deleteProfileController);
router.put("/update/:id", profileController.updateProfileController);

export default router;