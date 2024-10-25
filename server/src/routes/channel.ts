import { Router } from "express";
import verifyToken from "../middleware/verifyToken";
import Channels from "../controllers/channels";

const router = Router();

router.post("/create-channel", verifyToken, Channels.createChannel);
router.get("/get-user-channels", verifyToken, Channels.getUserChannels);
router.get(
  "/get-channel-messages/:channelId",
  verifyToken,
  Channels.getChannelMessages
);

export default router;
