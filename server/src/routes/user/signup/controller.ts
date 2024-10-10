import Users from "../../../db/models/Users";
import { Request, Response } from "express";

class CustomError extends Error {
  statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this.name = "CustomError";
    this.statusCode = statusCode;
  }
}

export default {
  create: (user, req: Request, res: Response) => {
    return Users.create(user)
      .then((data) => res.status(201).json(data))
      .catch((e) => {
        if (e.code == 11000) {
          res.status(409).json({ message: "User already exists" });
          return;
        }
        res.status(500).json({ message: "unexpected error" });
      });
  },
};
