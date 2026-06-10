import { PrismaClient, TaskStatus } from "@prisma/client";
export declare class TasksService {
    private prisma;
    constructor(prismaClient: PrismaClient);
    getAllTasks(userId: string, role: string): Promise<({
        user: {
            email: string;
            id: string;
            role: import("@prisma/client").$Enums.Role;
        };
    } & {
        id: string;
        title: string;
        status: import("@prisma/client").$Enums.TaskStatus;
        userId: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
    })[]>;
    createTask(userId: string, title: string, description?: string, status?: TaskStatus): Promise<{
        id: string;
        title: string;
        status: import("@prisma/client").$Enums.TaskStatus;
        userId: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
    }>;
    updateTask(taskId: string, userId: string, role: string, updateData: {
        title?: string;
        description?: string;
        status?: TaskStatus;
    }): Promise<{
        id: string;
        title: string;
        status: import("@prisma/client").$Enums.TaskStatus;
        userId: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
    }>;
    deleteTask(taskId: string, userId: string, role: string): Promise<{
        success: boolean;
        message: string;
    }>;
}
//# sourceMappingURL=tasks.service.d.ts.map