import { Request, Response, NextFunction, response } from "express";
import loginSchema from "../schemas/login";
import signupSchema from "../schemas/signup";
import Users from "../models/users";
import jwt from "jsonwebtoken";
import z from "../../../shared/node_modules/zod";
import Storage from "../services/storage";
import crypto from "node:crypto";

export interface RequestWithId extends Request {
  userId?: string;
}

const maxAge = 3 * 24 * 24 * 60 * 60 * 1000;
const { JWT_KEY } = process.env;
const createToken = (email: string, userId: string) => {
  const text = jwt.sign({ email, userId }, JWT_KEY || "", {
    expiresIn: maxAge,
  });
  return text;
};

export const signup = async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { email, password } = req.body;
  try {
    signupSchema.parse(req.body);
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
      return;
    }
    if ((e as any).code === 11000) {
      res.status(409).json({ message: "User already exists" });
      next(e);
      return;
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
      return;
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
  try {
    const file = request.file as Express.Multer.File;
    if (!file) {
      response.status(400).json({ message: "file is required" });
      return;
    }
    if (!Storage.ready) {
      response.status(500).json({ message: "Storage is not ready" });
      return;
    }
    const uploadStream = Storage.upload({
      name: file.originalname,
      size: file.size,
    });
    uploadStream.end(file.buffer);

    uploadStream.on("complete", async (file) => {
      const image = await file.link({ noKey: false });
      const updatedUser = await Users.findOneAndUpdate(
        { _id: request.userId },
        {
          image,
        },
        { new: true, runValidators: true }
      );
      response.status(200).json({ image });
    });

    uploadStream.on("error", (err) => {
      response.status(500).json({ message: "Upload failed" });
      console.log(err.message);
    });
    return;
  } catch (e) {
    console.log(e);
    response.json(500).json({ message: "something unexpected happened" });
    return;
  }
}

export async function removeProfileImage(
  request: RequestWithId,
  response: Response
) {
  try {
    const userData = await Users.findById(request.userId);
    if (!userData) {
      response.status(404).json({ message: "user with given id not found" });
      return;
    }
    if (!Storage.ready) {
      response.status(500).json({ message: "Storage is not ready" });
      return;
    }
    const fileId = userData.image?.split("/file/")[1].split("#")[0];
    const file = Storage.files[fileId || ""];
    await file.delete();
    userData.image = null;
    userData.save();
    response
      .status(204)
      .json({ message: "profile image removed successfully" });

    return;
  } catch (e) {
    console.log(e);
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
