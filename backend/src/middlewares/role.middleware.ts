import { Request, Response, NextFunction } from "express";
import { ApiResponse } from "../utils/ApiResponse";

type UserRole = "USER" | "ADMIN";

export const requireRole = (...allowedRoles: UserRole[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = res.locals.user;

    if (!user || !user.role) {
      return res.status(403).json(ApiResponse.error("Access denied", 403));
    }

    if (!allowedRoles.includes(user.role)) {
      return res.status(403).json(ApiResponse.error("Insufficient permissions", 403));
    }

    next();
  };
};

export default requireRole;
