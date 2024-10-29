import mongoose from "mongoose";

const channelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  members: [{ type: mongoose.Schema.ObjectId, ref: "Users", required: true }],
  admin: { type: mongoose.Schema.ObjectId, ref: "Users", required: true },
  messages: [
    { type: mongoose.Schema.ObjectId, ref: "Messages", required: false },
  ],
  avatar: {
    type: String,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: new Date(),
  },
});

channelSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});
channelSchema.pre("findOneAndUpdate", function (next) {
  this.set({ updateAt: Date.now() });
  next();
});

const Channels = mongoose.model("Channels", channelSchema);

export default Channels;
