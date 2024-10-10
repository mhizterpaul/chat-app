import { Router, Request, Response } from "express";
import loginSchema from "../../../../shared/login.schema";
import signupSchema from "../../../../shared/signup.schema";
import Users from "../../db/models/Users";

export const create = function (req: Request, res: Response) {
  const user = req.body;
  try {
    signupSchema.parse(user);
    Users.create(user)
      .then((data) => res.status(201).json(data))
      .catch((e) => {
        if (e.code == 11000) {
          res.status(409).json({ message: "User already exists" });
          return;
        }
        res.status(500).json({ message: "unexpected error" });
      });
  } catch (e) {
    res.status(401).json({ message: "bad request" });
  }
};

export const _delete = function (req: Request, res: Response) {
  const user = req.body;
  Users.deleteOne(user)
    .then(() => {
      res.status(204);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const login = function (res: Response, req: Request) {
  const credentials = req.body;
  try {
    loginSchema.parse(credentials);
  } catch (e) {
    res.status(401).json("bad request");
  }
};

export default {
  create,
  _delete,
  login,
};
