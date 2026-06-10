"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const express_1 = require("express");
const auth_service_1 = require("./auth.service");
const ApiResponse_1 = require("../../utils/ApiResponse");
const prisma_1 = __importDefault(require("../../lib/prisma"));
const authService = new auth_service_1.AuthService(prisma_1.default);
class AuthController {
    static async register(req, res, next) {
        try {
            const { email, password, role } = req.body;
            const { token, user } = await authService.registerUser(email, password, role);
            res
                .status(201)
                .json(ApiResponse_1.ApiResponse.success("User registered successfully", { token, user }));
        }
        catch (error) {
            next(error);
        }
    }
    static async login(req, res, next) {
        try {
            const { email, password } = req.body;
            const { token, user } = await authService.loginUser(email, password);
            res
                .status(200)
                .json(ApiResponse_1.ApiResponse.success("Login successful", { token, user }));
        }
        catch (error) {
            next(error);
        }
    }
}
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map