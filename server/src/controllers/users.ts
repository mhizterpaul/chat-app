import { Request, Response, NextFunction, response } from "express";
import loginSchema from "../../../shared/schemas/login";
import signupSchema from "../../../shared/schemas/signup";
import Users from "../models/users";
import jwt from "jsonwebtoken";
import z from "../../../shared/node_modules/zod";
import { Storage } from "megajs";

export interface RequestWithId extends Request {
  userId?: string;
}

const crypto = require("crypto");
const maxAge = 3 * 24 * 24 * 60 * 60 * 1000;
const { ALGORITHM, JWT_KEY, MEGA_USERNAME, MEGA_PASSWORD } = process.env;
const KEY = crypto.randomBytes(32);
const IV = crypto.randomBytes(16);
const createToken = (email: string, userId: string) => {
  const text = jwt.sign({ email, userId }, JWT_KEY || "", {
    expiresIn: maxAge,
  });
  const cipher = crypto.createCipheriv(ALGORITHM, KEY, IV);
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");
  return encrypted;
};

export const signup = async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { email, password } = req.body;
  try {
    signupSchema.parse({ email, password });
    Users.create({ email, password }).then((user) => {
      res.cookie("jwt", createToken(email, user.id), {
        maxAge,
        secure: true,
        sameSite: "none",
      });
      res.status(201).json({
        id: user.id,
        email: user.email,
        profileSetup: user.profileSetup,
      });
    });
  } catch (e) {
    if (e instanceof z.ZodError) {
      res.status(401).json({ message: "bad request" });
      next(e);
    }
    if ((e as any).code === 11000) {
      res.status(409).json({ message: "User already exists" });
      next(e);
    }

    res.status(500).json({ message: "unexpected error" });
    next(e);
  }
};

export const login = async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { email, password } = req.body;
  try {
    loginSchema.parse({ email, password });
    //check if user exists
    const user = await Users.findOne({ email });
    if (!user) {
      res.status(404).json({
        message: "user not found",
      });
      return;
    }
    res.cookie("jwt", createToken(email, user.id), {
      maxAge,
      secure: true,
      sameSite: "none",
    });
    res.status(200).json({
      user: {
        id: user.id,
        email: user.email,
        profileSetup: user.profileSetup,
        firstName: user.firstName,
        lastName: user.lastName,
        image: user.image,
      },
    });
  } catch (e) {
    if (e instanceof z.ZodError) {
      res.status(400).json({
        message: "invalid password and Email",
      });
      next(e);
    }
    res.status(500).json("unexpected error");
    next(e);
  }
};
export async function getUserInfo(request: RequestWithId, response: Response) {
  const { id } = request.params;
  const { userId } = request;
  try {
    const userData = await Users.findById(id || userId);
    if (!userData) {
      response.status(404).json({ message: "user with given id not found" });
      return;
    }

    response.status(200).json({
      user: {
        id: userData.id,
        email: userData.email,
        profileSetup: userData.profileSetup,
        firstName: userData.firstName,
        lastName: userData.lastName,
        image: userData.image,
      },
    });
    return;
  } catch (e) {
    console.log(e);
    response.status(500).json({ message: "something unexpected happened" });
    return;
  }
}
export async function updateProfile(
  request: RequestWithId,
  response: Response
) {
  const { userId } = request;
  const { firstName, lastName } = request.body;
  //validate firstName and lastName using Zod Schema
  try {
    const userData = await Users.findByIdAndUpdate(
      userId,
      { firstName, lastName, profileSetup: true },
      { new: true, runValidators: true }
    );
    if (!userData) {
      response.status(404).json({ message: "user with given id not found" });
      return;
    }
    response.status(200).json({
      user: {
        id: userData.id,
        email: userData.email,
        profileSetup: userData.profileSetup,
        firstName: userData.firstName,
        lastName: userData.lastName,
        image: userData.image,
      },
    });
  } catch (e) {
    console.log(e);
    response.json(500).json({ message: "something unexpected happened" });
  }
}

export async function addProfileImage(
  request: RequestWithId,
  response: Response
) {
  const storage = new Storage({
    email: MEGA_USERNAME || "",
    password: MEGA_PASSWORD || "",
    autologin: true,
  });
  try {
    const file = request.file as Express.Multer.File;
    if (!file) {
      response.status(400).json({ message: "file is required" });
      return;
    }
    const uploadStream = storage.upload({
      name: file.originalname,
      size: file.size,
    });
    uploadStream.end(file.buffer);
    const data = { image: "" };
    uploadStream.on("complete", async (file) => {
      data.image = await file.link({ noKey: true });
    });
    const updatedUser = await Users.findOneAndUpdate(
      { id: request.userId },
      {
        image: data.image,
      },
      { new: true, runValidators: true }
    );
    storage.close();
    response.status(200).json({ image: updatedUser?.image });
  } catch (e) {
    console.log(e);
    storage.close();
    response.json(500).json({ message: "something unexpected happened" });
    return;
  }
}

export async function removeProfileImage(
  request: RequestWithId,
  response: Response
) {
  const storage = new Storage({
    email: MEGA_USERNAME || "",
    password: MEGA_PASSWORD || "",
    autologin: true,
  });
  try {
    const userData = await Users.findById(request.userId);
    if (!userData) {
      response.status(404).json({ message: "user with given id not found" });
      return;
    }
    const fileId = userData.image?.split("/file/")[1].split("#")[0];
    const file = storage.files[fileId || ""];
    await file.delete();
    userData.image = null;
    userData.save();
    storage.close();
    response
      .status(204)
      .json({ message: "profile image removed successfully" });
    return;
  } catch (e) {
    console.log(e);
    storage.close();
    response.status(500).json({ message: "something unexpected happened" });
    return;
  }
}

export async function logout(request: Request, response: Response) {
  try {
    response.cookie("jwt", "", { maxAge: 1, secure: true, sameSite: "none" });
    response.status(200).json({ message: "logout successful" });
  } catch (e) {
    console.log(e);
    response.status(500).json({ message: "something unexpected happened" });
    return;
  }
}
export default {
  signup,
  login,
  getUserInfo,
  addProfileImage,
  removeProfileImage,
  updateProfile,
  logout,
};
