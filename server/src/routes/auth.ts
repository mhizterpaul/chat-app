import { Router } from "express";
import Auth from "../controllers/auth";
import cookieParser from "cookie-parser";

const router = Router();
router.use(cookieParser());

router.post("/signup", Auth.signup);

router.post("/login", Auth.login);

export default router;
