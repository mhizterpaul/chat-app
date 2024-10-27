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
  name: string;
  members: User[];
  admin: User;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
};

type Contact = {
  _id: number;
  lastMessageTime: Date;
  email: string;
  image: string;
};
