import { Router } from "express";
import User from "../controllers/users";
import verifyToken from "../middleware/verifyToken";
import multer from "multer";

const router = Router();
// Store files in memory
export const upload = multer({ storage: multer.memoryStorage() });

router.post("/signup", User.signup);

router.post("/login", User.login);

router.get("/user-info/:id", verifyToken, User.getUserInfo);

router.post("/update-profile", verifyToken, User.updateProfile);

router.post(
  "/add-profile-image",
  verifyToken,
  upload.single("profile-image"),
  User.addProfileImage
);

router.post("/logout", User.logout);
router.delete("/remove-profile-image", verifyToken, User.removeProfileImage);

export default router;
