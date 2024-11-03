import { Response } from "express";
import Messages from "../models/messages";
import { RequestWithId } from "./users";
import Storage from "../services/storage";

export async function getMessages(request: RequestWithId, response: Response) {
  try {
    const user1 = request.userId;
    const user2 = request.body.id;
    if (!user1 || !user2) {
      response.status(400).json({ message: "Both user ID's are required." });
      return;
    }
    const messages = await Messages.find({
      $or: [
        { sender: user1, recipient: user2 },
        { sender: user2, recipient: user1 },
      ],
    }).sort({ timestamp: 1 });
    response.status(200).json({ messages });
    return;
  } catch (e) {
    console.log(e);
    response.status(500).json({ message: "something unexpected happened" });
    return;
  }
}
export async function uploadFile(request: RequestWithId, response: Response) {
  try {
    const file = request.file as Express.Multer.File;
    if (!file) {
      response.status(400).json({ message: "file is required" });
      return;
    }
    if (!Storage.ready) {
      response.status(500).json({ message: "Storage is not ready" });
      return;
    }
    const uploadStream = Storage.upload({
      name: file.originalname,
      size: file.size,
    });
    uploadStream.end(file.buffer);

    uploadStream.on("complete", async (file) => {
      const fileUrl = await file.link({ noKey: false });
      response.status(200).json({ fileUrl });
    });

    uploadStream.on("error", (err) => {
      response.status(500).json({ message: "Upload failed" });
      console.log(err.message);
    });
    return;
  } catch (e) {
    console.log(e);
    response.status(500).json({ message: "something unexpected happened" });
    return;
  }
}

export default {
  getMessages,
  uploadFile,
};
