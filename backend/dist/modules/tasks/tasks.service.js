"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TasksService = void 0;
const zod_1 = require("zod");
const client_1 = require("@prisma/client");
const createTaskSchema = zod_1.z.object({
    title: zod_1.z.string().min(1, "Title is required"),
    description: zod_1.z.string().optional(),
    status: zod_1.z.enum(["PENDING", "IN_PROGRESS", "COMPLETED"]).optional(),
});
const updateTaskSchema = zod_1.z.object({
    title: zod_1.z.string().min(1).optional(),
    description: zod_1.z.string().optional(),
    status: zod_1.z.enum(["PENDING", "IN_PROGRESS", "COMPLETED"]).optional(),
});
const createTaskError = (message, statusCode) => {
    const error = new Error(message);
    error.statusCode = statusCode;
    return error;
};
class TasksService {
    constructor(prismaClient) {
        this.prisma = prismaClient;
    }
    async getAllTasks(userId, role) {
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
        }
        catch (error) {
            throw error;
        }
    }
    async createTask(userId, title, description, status) {
        try {
            // Validate input
            const validated = createTaskSchema.parse({ title, description, status });
            const task = await this.prisma.task.create({
                data: {
                    title: validated.title,
                    description: validated.description,
                    status: validated.status || "PENDING",
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
        }
        catch (error) {
            if (error instanceof zod_1.z.ZodError) {
                throw error;
            }
            throw error;
        }
    }
    async updateTask(taskId, userId, role, updateData) {
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
        }
        catch (error) {
            if (error instanceof zod_1.z.ZodError) {
                throw error;
            }
            throw error;
        }
    }
    async deleteTask(taskId, userId, role) {
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
        }
        catch (error) {
            throw error;
        }
    }
}
exports.TasksService = TasksService;
//# sourceMappingURL=tasks.service.js.map