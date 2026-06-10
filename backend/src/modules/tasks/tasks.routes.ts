import { Router } from "express";
import authMiddleware from "../../middlewares/auth.middleware";
import { TasksController } from "./tasks.controller";

const router = Router();

// All routes protected with auth middleware
router.use(authMiddleware);

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Get all tasks
 *     description: Retrieve all tasks (Admins see all tasks, Users see only their own)
 *     tags:
 *       - Tasks
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Tasks retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: Tasks retrieved successfully
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Task'
 *                 success:
 *                   type: boolean
 *                   example: true
 *       401:
 *         description: Unauthorized - Invalid or missing token
 */
router.get("/", TasksController.getAllTasks);

/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Create a new task
 *     description: Create a new task for the authenticated user
 *     tags:
 *       - Tasks
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Buy groceries
 *               description:
 *                 type: string
 *                 example: Milk, eggs, bread
 *               status:
 *                 type: string
 *                 enum: [PENDING, IN_PROGRESS, COMPLETED]
 *                 default: PENDING
 *             required:
 *               - title
 *     responses:
 *       201:
 *         description: Task created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 201
 *                 message:
 *                   type: string
 *                   example: Task created successfully
 *                 data:
 *                   $ref: '#/components/schemas/Task'
 *                 success:
 *                   type: boolean
 *                   example: true
 *       400:
 *         description: Validation error or invalid request
 *       401:
 *         description: Unauthorized - Invalid or missing token
 */
router.post("/", TasksController.createTask);

/**
 * @swagger
 * /tasks/{id}:
 *   put:
 *     summary: Update a task
 *     description: Update an existing task (Users can only update their own tasks)
 *     tags:
 *       - Tasks
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Task ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Buy groceries
 *               description:
 *                 type: string
 *                 example: Milk, eggs, bread
 *               status:
 *                 type: string
 *                 enum: [PENDING, IN_PROGRESS, COMPLETED]
 *     responses:
 *       200:
 *         description: Task updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: Task updated successfully
 *                 data:
 *                   $ref: '#/components/schemas/Task'
 *                 success:
 *                   type: boolean
 *                   example: true
 *       400:
 *         description: Validation error or invalid request
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       403:
 *         description: Forbidden - Cannot update another user's task
 *       404:
 *         description: Task not found
 */
router.put("/:id", TasksController.updateTask);

/**
 * @swagger
 * /tasks/{id}:
 *   delete:
 *     summary: Delete a task
 *     description: Delete an existing task (Users can only delete their own tasks)
 *     tags:
 *       - Tasks
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Task ID
 *     responses:
 *       200:
 *         description: Task deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: Task deleted successfully
 *                 data:
 *                   type: "null"
 *                 success:
 *                   type: boolean
 *                   example: true
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       403:
 *         description: Forbidden - Cannot delete another user's task
 *       404:
 *         description: Task not found
 */
router.delete("/:id", TasksController.deleteTask);

export default router;
