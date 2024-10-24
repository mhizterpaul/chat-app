import { Response } from "express";
import Messages from "../db/models/messages";
import { RequestWithId } from "./users";
import { Storage } from "megajs";

const { MEGA_USERNAME, MEGA_PASSWORD } = process.env;
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
  const storage = new Storage({
    email: MEGA_USERNAME || "",
    password: MEGA_PASSWORD || "",
    autologin: true,
  });
  try {
    const file = request.file as Express.Multer.File;
    if (!file) {
      response.status(400).json({ message: "file is required" });
      return;
    }
    const uploadStream = storage.upload({
      name: file.originalname,
      size: file.size,
    });
    uploadStream.end(file.buffer);
    let link;
    uploadStream.on("complete", async (file) => {
      link = await file.link({ noKey: true });
    });
    response.status(200).json({ filePath: link });
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
