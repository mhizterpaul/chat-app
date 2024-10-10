import { Request, Response, NextFunction } from "express";
import loginSchema from "../../../shared/login.schema";
import signupSchema from "../../../shared/signup.schema";
import Users from "../db/models/users";
import jwt from "jsonwebtoken";
import z from "../../../shared/node_modules/zod";

const crypto = require("cryto");
const maxAge = 3 * 24 * 24 * 60 * 60 * 1000;
const { KEY, IV, ALGORITHM, JWT_KEY } = process.env;

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
    if (req.cookies) {
      const decipher = crypto.createDecipheriv(ALGORITHM, KEY, IV);
      let decrypted = decipher.update(req.cookies, "hex", "utf8");
      decrypted += decipher.final("utf8");
      const { email } = jwt.decode(decrypted) as { email: string };
      const user = await Users.findOne({ email });
      if (!user) {
        res.status(404).json({
          message: "user not found",
        });
        return;
      }
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
    }
    //validate login body
    loginSchema.parse({ email, password });
    //check if user exists
    const user = await Users.findOne({ email });
    if (!user) {
      res.status(404).json({
        message: "user not found",
      });
      return;
    }
    //validate password
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
export default {
  signup,
  login,
};
