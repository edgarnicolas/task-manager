import { Router } from "express";
import {
  createTask,
  getTasks,
  getTaskById,
  updateTaskById,
  deleteTaskById,
} from "../controllers/taskController";
import authMiddleware from "../middlewares/authMiddleware";

const router = Router();

router.post("/tasks", authMiddleware, createTask);
router.get("/tasks", authMiddleware, getTasks);
router.get("/tasks/:id", authMiddleware, getTaskById);
router.put("/tasks/:id", authMiddleware, updateTaskById);
router.delete("/tasks/:id", authMiddleware, deleteTaskById);

export default router;
