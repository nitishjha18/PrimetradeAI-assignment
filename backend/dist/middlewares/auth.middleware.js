"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const express_1 = require("express");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const ApiResponse_1 = require("../utils/ApiResponse");
const authMiddleware = (req, res, next) => {
    try {
        // Extract Authorization header
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json(ApiResponse_1.ApiResponse.error("Missing or invalid token", 401));
        }
        // Extract Bearer token
        const token = authHeader.substring(7);
        // Verify JWT
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        // Attach decoded payload to res.locals
        res.locals.user = {
            userId: decoded.userId,
            role: decoded.role,
        };
        next();
    }
    catch (error) {
        if (error instanceof jsonwebtoken_1.default.TokenExpiredError) {
            return res.status(401).json(ApiResponse_1.ApiResponse.error("Token expired", 401));
        }
        if (error instanceof jsonwebtoken_1.default.JsonWebTokenError) {
            return res.status(401).json(ApiResponse_1.ApiResponse.error("Invalid token", 401));
        }
        return res.status(401).json(ApiResponse_1.ApiResponse.error("Unauthorized", 401));
    }
};
exports.authMiddleware = authMiddleware;
exports.default = exports.authMiddleware;
//# sourceMappingURL=auth.middleware.js.map