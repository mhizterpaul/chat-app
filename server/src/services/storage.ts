import { Storage } from "megajs";

const storage = new Storage({
  email: process.env.MEGA_USERNAME || "",
  password: process.env.MEGA_PASSWORD || "",
  autologin: true,
});

export default storage;
