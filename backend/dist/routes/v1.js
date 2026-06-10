"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_routes_1 = __importDefault(require("../modules/auth/auth.routes"));
const tasks_routes_1 = __importDefault(require("../modules/tasks/tasks.routes"));
const router = (0, express_1.Router)();
// Auth routes
router.use("/auth", auth_routes_1.default);
// Tasks routes
router.use("/tasks", tasks_routes_1.default);
exports.default = router;
//# sourceMappingURL=v1.js.map