import { Request, Response, NextFunction } from "express";
import { TasksService } from "./tasks.service";
import { ApiResponse } from "../../utils/ApiResponse";
import prisma from "../../lib/prisma";

const tasksService = new TasksService(prisma);

export class TasksController {
  static async getAllTasks(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId, role } = res.locals.user;

      const tasks = await tasksService.getAllTasks(userId, role);

      res
        .status(200)
        .json(ApiResponse.success("Tasks retrieved successfully", tasks));
    } catch (error) {
      next(error);
    }
  }

  static async createTask(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = res.locals.user;
      const { title, description, status } = req.body;

      const task = await tasksService.createTask(userId, title, description, status);

      res
        .status(201)
        .json(ApiResponse.success("Task created successfully", task));
    } catch (error) {
      next(error);
    }
  }

  static async updateTask(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId, role } = res.locals.user;
      const { id } = req.params;
      const { title, description, status } = req.body;

      const task = await tasksService.updateTask(
        id,
        userId,
        role,
        { title, description, status }
      );

      res
        .status(200)
        .json(ApiResponse.success("Task updated successfully", task));
    } catch (error) {
      next(error);
    }
  }

  static async deleteTask(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId, role } = res.locals.user;
      const { id } = req.params;

      await tasksService.deleteTask(id, userId, role);

      res.status(200).json(ApiResponse.success("Task deleted successfully"));
    } catch (error) {
      next(error);
    }
  }
}
