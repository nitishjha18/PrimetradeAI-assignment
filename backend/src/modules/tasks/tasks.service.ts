import { z } from "zod";
import { PrismaClient, TaskStatus } from "@prisma/client";

const createTaskSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  status: z.enum(["PENDING", "IN_PROGRESS", "COMPLETED"]).optional(),
});

const updateTaskSchema = z.object({
  title: z.string().min(1).optional(),
  description: z.string().optional(),
  status: z.enum(["PENDING", "IN_PROGRESS", "COMPLETED"]).optional(),
});

interface TaskError extends Error {
  statusCode: number;
}

const createTaskError = (message: string, statusCode: number): TaskError => {
  const error = new Error(message) as TaskError;
  error.statusCode = statusCode;
  return error;
};

export class TasksService {
  private prisma: PrismaClient;

  constructor(prismaClient: PrismaClient) {
    this.prisma = prismaClient;
  }

  async getAllTasks(userId: string, role: string) {
    try {
      // Admins see all tasks, users see only their own
      const where = role === "ADMIN" ? {} : { userId };

      const tasks = await this.prisma.task.findMany({
        where,
        include: {
          user: {
            select: {
              id: true,
              email: true,
              role: true,
            },
          },
        },
        orderBy: { createdAt: "desc" },
      });

      return tasks;
    } catch (error) {
      throw error;
    }
  }

  async createTask(
    userId: string,
    title: string,
    description?: string,
    status?: TaskStatus
  ) {
    try {
      // Validate input
      const validated = createTaskSchema.parse({ title, description, status });

      const task = await this.prisma.task.create({
        data: {
          title: validated.title,
          description: validated.description,
          status: (validated.status as TaskStatus) || "PENDING",
          userId,
        },
        include: {
          user: {
            select: {
              id: true,
              email: true,
              role: true,
            },
          },
        },
      });

      return task;
    } catch (error) {
      if (error instanceof z.ZodError) {
        throw error;
      }
      throw error;
    }
  }

  async updateTask(
    taskId: string,
    userId: string,
    role: string,
    updateData: {
      title?: string;
      description?: string;
      status?: TaskStatus;
    }
  ) {
    try {
      // Validate input
      const validated = updateTaskSchema.parse(updateData);

      // Find task
      const task = await this.prisma.task.findUnique({
        where: { id: taskId },
      });

      if (!task) {
        throw createTaskError("Task not found", 404);
      }

      // Check authorization (owner or admin)
      if (task.userId !== userId && role !== "ADMIN") {
        throw createTaskError("Unauthorized to update this task", 403);
      }

      // Update task
      const updatedTask = await this.prisma.task.update({
        where: { id: taskId },
        data: validated,
        include: {
          user: {
            select: {
              id: true,
              email: true,
              role: true,
            },
          },
        },
      });

      return updatedTask;
    } catch (error) {
      if (error instanceof z.ZodError) {
        throw error;
      }
      throw error;
    }
  }

  async deleteTask(taskId: string, userId: string, role: string) {
    try {
      // Find task
      const task = await this.prisma.task.findUnique({
        where: { id: taskId },
      });

      if (!task) {
        throw createTaskError("Task not found", 404);
      }

      // Check authorization (owner or admin)
      if (task.userId !== userId && role !== "ADMIN") {
        throw createTaskError("Unauthorized to delete this task", 403);
      }

      // Delete task
      await this.prisma.task.delete({
        where: { id: taskId },
      });

      return { success: true, message: "Task deleted successfully" };
    } catch (error) {
      throw error;
    }
  }
}
