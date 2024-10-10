import express, { Request, Response } from "express";
import User from "../controllers/user";
const router = express.Router();

router.post("user/signup", User.create);

router.post("user/login", User.login);

router.delete("user/delete/:id", User._delete);
