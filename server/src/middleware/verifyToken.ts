import jwt, { JwtPayload } from "jsonwebtoken";
import { Response, NextFunction } from "express";
import { RequestWithId } from "../controllers/users";

const { JWT_KEY } = process.env;

export default function verifyToken(
  request: RequestWithId,
  response: Response,
  next: NextFunction
) {
  const token = request.cookies.jwt;
  if (!token) {
    response.status(401).json({ message: "You are not authenticated" });
    return;
  }

  jwt.verify(
    token,
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
