import express from "express";
require("dontenv").config();
const socket = require("socket.io");
const cors = require("cors");
import cookieParser from "cookie-parser";
import openDatabaseConnection from "./db/openConnection";
import setUpSocket from "./socket";

const app = express();
const port = process.env.PORT||3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const server = app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

setUpSocket(server);
openDatabaseConnection();

export default app;
