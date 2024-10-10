import { Request, Response } from "express";
import Users from "../db/models/users";

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

export default {
  _delete,
};
