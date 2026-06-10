import { Router } from "express";
import authRoutes from "../modules/auth/auth.routes";
import tasksRoutes from "../modules/tasks/tasks.routes";

const router = Router();

// Auth routes
router.use("/auth", authRoutes);

// Tasks routes
router.use("/tasks", tasksRoutes);

export default router;
