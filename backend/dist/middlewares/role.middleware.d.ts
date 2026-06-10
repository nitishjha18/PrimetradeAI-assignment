import { Request, Response, NextFunction } from "express";
type UserRole = "USER" | "ADMIN";
export declare const requireRole: (...allowedRoles: UserRole[]) => (req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
export default requireRole;
//# sourceMappingURL=role.middleware.d.ts.map