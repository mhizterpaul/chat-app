import express, { Request, Response } from "express";
import validationSchema from "../../../../../shared/signup.schema";
import controller from "./controller";
const router = express.Router();

router.post("user/signup", (req: Request, res: Response) => {
  const form = req.body;
  try {
    validationSchema.parse(form);
    controller.create(form, req, res);
  } catch (e) {
    res.status(401).json({ message: "bad request" });
  }
});

export default router;
