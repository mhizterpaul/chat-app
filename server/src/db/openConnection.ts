import mongoose from "mongoose";

export const db: { connection?: mongoose.Connection } = {};

export default () => {
  mongoose.connect(process.env.CONNECTION_STRING || "");
  db.connection = mongoose.connection;
  db.connection.on("error", console.error.bind(console, "connection error:"));
  db.connection.once("open", function () {
    console.log("Connected to the database");
  });
};
