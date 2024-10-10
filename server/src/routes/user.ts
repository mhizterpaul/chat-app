import { Router } from "express";
import User from "../controllers/user";

const router = Router();

router.delete("user/delete/:id", User._delete);
