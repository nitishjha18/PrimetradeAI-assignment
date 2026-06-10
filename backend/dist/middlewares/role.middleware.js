"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireRole = void 0;
const express_1 = require("express");
const ApiResponse_1 = require("../utils/ApiResponse");
const requireRole = (...allowedRoles) => {
    return (req, res, next) => {
        const user = res.locals.user;
        if (!user || !user.role) {
            return res.status(403).json(ApiResponse_1.ApiResponse.error("Access denied", 403));
        }
        if (!allowedRoles.includes(user.role)) {
            return res.status(403).json(ApiResponse_1.ApiResponse.error("Insufficient permissions", 403));
        }
        next();
    };
};
exports.requireRole = requireRole;
exports.default = exports.requireRole;
//# sourceMappingURL=role.middleware.js.map