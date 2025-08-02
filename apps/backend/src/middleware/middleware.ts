import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = "HAesh123";

interface JwtPayload {
  id: string;
}

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const token = req.headers.authorization as unknown as string;
  try {
    // const validtoken = token.split(' ')?.[1]
    const payload = jwt.verify(token, JWT_SECRET) as JwtPayload;
    // @ts-ignore
    req.UserID = payload.id;
    next();
  } catch (e) {
    return res.status(403).json({
      message: "You are not logged in",
    });
  }
}
