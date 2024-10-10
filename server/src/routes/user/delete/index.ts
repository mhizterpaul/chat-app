import { Router, Request, Response } from "express";
import controller from './controller'
const router = Router();

router.delete("/user/delete", controller.delete);
