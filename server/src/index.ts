import express from "express";
require("dotenv").config();
const socket = require("socket.io");
const cors = require("cors");
import cookieParser from "cookie-parser";
import openDatabaseConnection from "./config";
import setUpSocket from "./socket";
import Routes from "./routes";

const app = express();
const port = process.env.PORT || 3000;

app.use(
  cors({
    origin: [process.env.ORIGIN],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/channel", Routes.channelRoute);
app.use("/api/contacts", Routes.contactRoute);
app.use("/api/messages", Routes.messageRoute);
app.use("/api/user", Routes.userRoute);

const server = app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

setUpSocket(server);
openDatabaseConnection();

export default app;
