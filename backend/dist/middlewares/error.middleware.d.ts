import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
interface CustomError extends Error {
    statusCode?: number;
}
export declare const errorMiddleware: (err: CustomError | ZodError, req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
export default errorMiddleware;
//# sourceMappingURL=error.middleware.d.ts.map