import { Request, Response, NextFunction } from "express";
export declare class TasksController {
    static getAllTasks(req: Request, res: Response, next: NextFunction): Promise<void>;
    static createTask(req: Request, res: Response, next: NextFunction): Promise<void>;
    static updateTask(req: Request, res: Response, next: NextFunction): Promise<void>;
    static deleteTask(req: Request, res: Response, next: NextFunction): Promise<void>;
}
//# sourceMappingURL=tasks.controller.d.ts.map