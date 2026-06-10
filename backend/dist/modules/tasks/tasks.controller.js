"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TasksController = void 0;
const express_1 = require("express");
const tasks_service_1 = require("./tasks.service");
const ApiResponse_1 = require("../../utils/ApiResponse");
const prisma_1 = __importDefault(require("../../lib/prisma"));
const tasksService = new tasks_service_1.TasksService(prisma_1.default);
class TasksController {
    static async getAllTasks(req, res, next) {
        try {
            const { userId, role } = res.locals.user;
            const tasks = await tasksService.getAllTasks(userId, role);
            res
                .status(200)
                .json(ApiResponse_1.ApiResponse.success("Tasks retrieved successfully", tasks));
        }
        catch (error) {
            next(error);
        }
    }
    static async createTask(req, res, next) {
        try {
            const { userId } = res.locals.user;
            const { title, description, status } = req.body;
            const task = await tasksService.createTask(userId, title, description, status);
            res
                .status(201)
                .json(ApiResponse_1.ApiResponse.success("Task created successfully", task));
        }
        catch (error) {
            next(error);
        }
    }
    static async updateTask(req, res, next) {
        try {
            const { userId, role } = res.locals.user;
            const { id } = req.params;
            const { title, description, status } = req.body;
            const task = await tasksService.updateTask(id, userId, role, { title, description, status });
            res
                .status(200)
                .json(ApiResponse_1.ApiResponse.success("Task updated successfully", task));
        }
        catch (error) {
            next(error);
        }
    }
    static async deleteTask(req, res, next) {
        try {
            const { userId, role } = res.locals.user;
            const { id } = req.params;
            await tasksService.deleteTask(id, userId, role);
            res.status(200).json(ApiResponse_1.ApiResponse.success("Task deleted successfully"));
        }
        catch (error) {
            next(error);
        }
    }
}
exports.TasksController = TasksController;
//# sourceMappingURL=tasks.controller.js.map