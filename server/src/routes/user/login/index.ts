import { Router, Request, Response } from "express";
import validationSchema from "../../../../../shared/login.schema";
import controller from './controller'
const router = Router();

router.post("user/login", async (req: Request, res: Response) => {
    const credentials = req.body;
    try{
        validationSchema.parse(credentials)
        controller.login(credentials);
    }catch(e){
        res.status(401).json("bad request")
    }
});

export default router;
