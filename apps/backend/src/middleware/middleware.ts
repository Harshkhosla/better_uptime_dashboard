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
      userId?: string;
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
    req.userId = payload.id; // Also set userId for consistency
    req.user = { id: payload.id }; // Set user object for new routes
    next();
  } catch (e) {
    res.status(403).json({
      message: "You are not logged in",
    });
    return;
  }
}

// Export an alias for backward compatibility
export const authenticateJWT = authMiddleware;
