import { Request, Response } from "express";
import { RequestWithId } from "./users";
import Users from "../models/users";
import Messages from "../models/messages";
import mongoose, { Types } from "mongoose";

export async function searchContacts(
  request: RequestWithId,
  response: Response
) {
  try {
    const { searchTerm } = request.body;
    if (!searchTerm) {
      response.status(400).json({ message: "searchTerm is required" });
      return;
    }
    const sanitizedSearchTerm = searchTerm.replace(
      /[.*,\/_\-#!+?^${}()|[\]\\]/g,
      "\\$&"
    );
    const regex = new RegExp(sanitizedSearchTerm, "i");
    const contacts = await Users.find({
      $and: [
        { _id: { $ne: request.userId } },
        {
          $or: [{ firstName: regex }, { lasName: regex }, { email: regex }],
        },
      ],
    });
    response.status(200).json({ contacts });
    return;
  } catch (e) {
    console.log(e);
    response.status(500).json({ message: "something unexpected happened" });
    return;
  }
}

export async function getContactsForDmList(
  request: RequestWithId,
  response: Response
) {
  try {
    let userId = request.userId as Types.ObjectId | string | undefined;
    userId = new mongoose.Types.ObjectId(userId);

    const contacts = await Messages.aggregate([
      {
        $match: {
          $or: [{ sender: userId }, { recipient: userId }],
        },
      },
      {
        $sort: {
          timestamp: -1,
        },
      },
      {
        $group: {
          _id: {
            $cond: {
              if: { $eq: ["$sender", userId] },
              then: "$recipient",
              else: "$sender",
            },
          },
          lastMessageTime: { $first: "$timestamp" },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "contactInfo",
        },
      },
      {
        $unwind: "$contactInfo",
      },
      {
        $project: {
          _id: 1,
          lastMessageTime: 1,
          firstName: "$contactInfo.firstName",
          lastName: "$contactInfo.lastName",
          lastMessage: {
            messageType: "$lastMessage.messageType",
            content: "$lastMessage.content",
            fileUrl: "$lastMessage.fileUrl",
            timeStamp: "$lastMessage.timestamp",
          },
          image: "$contactInfo.image",
        },
      },
      {
        $sort: {
          lastMessageTime: -1,
        },
      },
    ]);

    response.status(200).json({ contacts });
    return;
  } catch (e) {
    console.log(e);
    response.status(500).json({ message: "something unexpected happened" });
    return;
  }
}

export async function getAllContacts(
  request: RequestWithId,
  response: Response
) {
  try {
    const users = await Users.find(
      { _id: { $ne: request.userId } },
      "firstName lastName _id email"
    );
    const contacts = users.map((user) => ({
      label: user.firstName ? `${user.firstName} ${user.lastName}` : user.email,
      avatar: user.image,
    }));
    response.status(200).json({ contacts });
    return;
  } catch (e) {
    console.log(e);
    response.status(500).json({ message: "something unexpected happened" });
    return;
  }
}

export default {
  searchContacts,
  getAllContacts,
  getContactsForDmList,
};
