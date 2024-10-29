import { User } from "../user/types";

type Message = {
  sender: User;
  recipient?: User;
  messageType: "text" | "file";
  content?: string;
  fileUrl?: string;
  timeStamp: Date;
};

type Channel = {
  _id: number;
  name: string;
  members: User[];
  admin: User;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
  avatar?: string;
};

type Contact = {
  _id: number;
  firstName: string;
  lastName: string;
  lastMessage: {
    messageType: "text" | "file";
    content?: string;
    fileUrl?: string;
    timeStamp: Date;
  };
  image: string;
};
