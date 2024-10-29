import Channels from "../models/channels";
import Users from "../models/users";
import { RequestWithId } from "./users";
import { Response } from "express";
import mongoose from "mongoose";

export async function createChannel(
  request: RequestWithId,
  response: Response
) {
  try {
    const { name, members, avatar } = request.body;
    const userId = request.userId;

    const admin = await Users.findById(userId);
    if (!admin) {
      response.status(400).json({ message: "Admin user not found." });
      return;
    }
    const validMembers = await Users.find({ _id: { $in: members } });

    if (validMembers.length !== members.length) {
      response.status(400).json("some members are not valid users");
      return;
    }
    const newChannel = new Channels({
      name,
      members,
      admin: userId,
      avatar,
    });
    await newChannel.save();
    response.status(201).json({ channel: newChannel });
  } catch (e) {
    console.log(e);
    response.status(500).json({ message: "something unexpected happened" });
    return;
  }
}

export async function getUserChannels(
  request: RequestWithId,
  response: Response
) {
  try {
    const userId = new mongoose.Types.ObjectId(request.userId);
    const channels = await Channels.find({
      $or: [{ admin: userId }, { members: userId }],
    }).sort({ updatedAt: -1 });
    response.send(200).json({ channels });
    return;
  } catch (e) {
    console.log(e);
    response.status(500).json({ message: "something unexpected happened" });
    return;
  }
}

export async function getChannelMessages(
  request: RequestWithId,
  response: Response
) {
  try {
    const { channelId } = request.params;
    const channel = await Channels.findById(channelId).populate({
      path: "messages",
      populate: {
        path: "sender",
        select: "firstName lastName email _id image",
      },
    });
    if (!channel) {
      response.status(404).json({ message: "Channel not found" });
      return;
    }
    const messages = channel.messages;
    response.status(200).json({ messages });
  } catch (e) {
    console.log(e);
    response.status(500).json({ message: "something unexpected happened" });
    return;
  }
}

export default {
  createChannel,
  getUserChannels,
  getChannelMessages,
};
