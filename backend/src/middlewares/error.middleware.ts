import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { ApiResponse } from "../utils/ApiResponse";

interface CustomError extends Error {
  statusCode?: number;
}

export const errorMiddleware = (
  err: CustomError | ZodError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log(
    "ERROR TYPE:",
    err.constructor.name,
    "ERROR:",
    JSON.stringify(err),
  );

  if (process.env.NODE_ENV !== "production") {
    console.error("Error:", err);
  }

  if (err instanceof ZodError) {
    const validationErrors = err.issues.map((e) => ({
      field: e.path.join("."),
      message: e.message,
    }));

    return res
      .status(422)
      .json(new ApiResponse(422, "Validation error", validationErrors, false));
  }

  const statusCode = (err as CustomError).statusCode || 500;
  const message = err.message || "Internal server error";

  res.status(statusCode).json(ApiResponse.error(message, statusCode));
};

export default errorMiddleware;
