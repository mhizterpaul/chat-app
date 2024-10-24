import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction, response } from "express";
import { RequestWithId } from "../controllers/user";

const crypto = require("crypto");
const { KEY, IV, ALGORITHM, JWT_KEY } = process.env;
const decipher = crypto.createDecipheriv(ALGORITHM, KEY, IV);

export default function verifyToken(
  request: RequestWithId,
  reponse: Response,
  next: NextFunction
) {
  const token = request.cookies.jwt;
  if (!token) {
    response.status(401).json({ message: "You are not authenticated" });
    return;
  }

  let decryptedToken = decipher.update(request.cookies.jwt, "hex", "utf8");
  decryptedToken += decipher.final("utf8");
  jwt.verify(
    decryptedToken,
    JWT_KEY || "",
    { complete: false },
    (err: Error | null, payload: string | JwtPayload | undefined) => {
      if (err) {
        response.status(403).json({ message: "Token is invalid" });
        return;
      }
      if (payload instanceof Object) request.userId = payload.userId;
      next();
    }
  );
}
