import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = "HAesh123";

interface JwtPayload {
  id: string;
}

declare global {
  namespace Express {
    interface Request {
      UserID?: string;
      user?: { id: string };
    }
  }
}

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const authHeader = req.headers?.authorization;
  const token = authHeader as string;

  try {
    const validtoken = token?.split(" ")?.[1];
    if (!validtoken) {
      res.status(403).json({
        message: "No token provided",
      });
      return;
    }
    
    const payload = jwt.verify(validtoken, JWT_SECRET) as JwtPayload;
    req.UserID = payload.id;
    next();
  } catch (e) {
    res.status(403).json({
      message: "You are not logged in",
    });
    return;
  }
}
