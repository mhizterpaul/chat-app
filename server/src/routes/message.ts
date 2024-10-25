import { Router } from "express";
import verifyToken from "../middleware/verifyToken";
import Messages from "../controllers/messages";
import { upload } from "./user";

const router = Router();

router.post("/get-messages", verifyToken, Messages.getMessages);
router.post(
  "/upload-file",
  verifyToken,
  upload.single("single"),
  Messages.uploadFile
);

export default router;
