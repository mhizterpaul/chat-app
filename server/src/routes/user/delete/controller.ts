import Users from "../../../db/models/Users";
import { Request, Response } from "express";

export default {
  delete: (req: Request, res: Response) => {
    const user = req.body;
    Users.deleteOne(user)
      .then(() => {
        res.status(204);
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
