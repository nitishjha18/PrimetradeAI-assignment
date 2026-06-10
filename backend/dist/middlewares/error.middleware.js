"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = void 0;
const express_1 = require("express");
const zod_1 = require("zod");
const ApiResponse_1 = require("../utils/ApiResponse");
const errorMiddleware = (err, req, res, next) => {
    console.log("ERROR TYPE:", err.constructor.name, "ERROR:", JSON.stringify(err));
    if (process.env.NODE_ENV !== "production") {
        console.error("Error:", err);
    }
    if (err instanceof zod_1.ZodError) {
        const validationErrors = err.issues.map((e) => ({
            field: e.path.join("."),
            message: e.message,
        }));
        return res
            .status(422)
            .json(new ApiResponse_1.ApiResponse(422, "Validation error", validationErrors, false));
    }
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal server error";
    res.status(statusCode).json(ApiResponse_1.ApiResponse.error(message, statusCode));
};
exports.errorMiddleware = errorMiddleware;
exports.default = exports.errorMiddleware;
//# sourceMappingURL=error.middleware.js.map