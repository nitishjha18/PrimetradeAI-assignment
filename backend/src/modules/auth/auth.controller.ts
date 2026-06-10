import { Request, Response, NextFunction } from "express";
import { AuthService } from "./auth.service";
import { ApiResponse } from "../../utils/ApiResponse";
import prisma from "../../lib/prisma";

const authService = new AuthService(prisma);

export class AuthController {
  static async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password, role } = req.body;

      const { token, user } = await authService.registerUser(
        email,
        password,
        role
      );

      res
        .status(201)
        .json(
          ApiResponse.success("User registered successfully", { token, user })
        );
    } catch (error) {
      next(error);
    }
  }

  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;

      const { token, user } = await authService.loginUser(email, password);

      res
        .status(200)
        .json(
          ApiResponse.success("Login successful", { token, user })
        );
    } catch (error) {
      next(error);
    }
  }
}
