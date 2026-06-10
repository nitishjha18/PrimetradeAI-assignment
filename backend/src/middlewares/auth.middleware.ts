import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { ApiResponse } from "../utils/ApiResponse";

interface JwtPayload {
  userId: string;
  role: string;
  iat?: number;
  exp?: number;
}

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Extract Authorization header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json(ApiResponse.error("Missing or invalid token", 401));
    }

    // Extract Bearer token
    const token = authHeader.substring(7);

    // Verify JWT
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as JwtPayload;

    // Attach decoded payload to res.locals
    res.locals.user = {
      userId: decoded.userId,
      role: decoded.role,
    };

    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json(ApiResponse.error("Token expired", 401));
    }
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json(ApiResponse.error("Invalid token", 401));
    }
    return res.status(401).json(ApiResponse.error("Unauthorized", 401));
  }
};

export default authMiddleware;
