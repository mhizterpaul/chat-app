import { Server as SocketIOServer, Socket } from "socket.io";
import Messages from "./models/messages";
import { Types, Document } from "mongoose";
import Channels from "./models/channels";

interface IMessage extends Document {
  sender: Types.ObjectId;
  messageType: "text" | "file";
  timeStamp: Date;
  recipient?: Types.ObjectId | null | undefined;
  content?: string | null | undefined;
  fileUrl?: string | null | undefined;
}

interface IChannelMessage extends IMessage {
  channelId: Types.ObjectId;
}
export default function setUpSocket(server: Express.Application) {
  const io = new SocketIOServer(server, {
    cors: {
      origin: process.env.ORIGIN || "",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  const userSocketMap = new Map();
  const disconnect = (
    socket: Socket,
    userId: string | string[] | undefined
  ) => {
    console.log(`Client Disconnected: ${socket.id}`);
    userSocketMap.delete(userId);
  };
  const sendMessage = async (message: IMessage) => {
    const senderSocketId = userSocketMap.get(message.sender);
    const recipientSocketId = userSocketMap.get(message.recipient);

    const createdMessage = await Messages.create(message);
    const messageData = await Messages.findById(createdMessage._id)
      .populate("sender", "id email firstName lastName image")
      .populate("recipient", "id email firstName lastName image");

    if (recipientSocketId) {
      io.to(recipientSocketId).emit("recievedMessage", messageData);
    }
    if (senderSocketId) {
      io.to(senderSocketId).emit("recieveMessage", messageData);
    }
  };
  const sendChannelMessage = async (message: IChannelMessage) => {
    const { channelId, sender, content, messageType, fileUrl } = message;
    const createdMessage = await Messages.create({
      recipient: null,
      content,
      messageType,
      timestamp: new Date(),
      fileUrl,
    });
    const messageData = await Messages.findById(createdMessage._id)
      .populate("sender", "id email firstName lastName image")
      .exec();
    await Channels.findByIdAndUpdate(channelId),
      {
        $push: { messages: createdMessage._id },
      };
    const channel = await Channels.findById(channelId).populate("members");
    const finalData = { ...messageData, channelId: channel?._id };
    if (channel && channel.members) {
      channel.members.forEach((member) => {
        const memberSocketId = userSocketMap.get(member._id.toString());
        if (memberSocketId)
          io.to(memberSocketId).emit("recieve-channel-message", finalData);
      });
      const adminSocketId = userSocketMap.get(channel.admin._id.toString());
      if (adminSocketId)
        io.to(adminSocketId).emit("recieve-channel-message", finalData);
    }
  };
  io.on("connection", (socket) => {
    const userId = socket.handshake.query.userId;
    if (userId) {
      userSocketMap.set(userId, socket.id);
    }
    socket.on("sendMessage", sendMessage);
    socket.on("send-channel-message", sendChannelMessage);
    socket.on("disconnect", () => disconnect(socket, userId));
  });
}
