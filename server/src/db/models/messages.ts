import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: false,
  },
  messageType: {
    type: String,
    enum: ["text", "file"],
    required: true,
  },
  content: {
    type: String,
    required: function (this: mongoose.Document & { messageType: String }) {
      return this.messageType === "text";
    },
  },
  fileUrl: {
    type: String,
    required: function (this: mongoose.Document & { messageType: String }) {
      return this.messageType === "file";
    },
  },
  timeStamp: {
    type: Date,
    default: Date.now(),
  },
});

const Messages = mongoose.model("Messages", messageSchema);

export default Messages;