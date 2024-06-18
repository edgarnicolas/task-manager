"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const taskController_1 = require("../controllers/taskController");
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware"));
const router = (0, express_1.Router)();
router.post("/tasks", authMiddleware_1.default, taskController_1.createTask);
router.get("/tasks", authMiddleware_1.default, taskController_1.getTasks);
router.get("/tasks/:id", authMiddleware_1.default, taskController_1.getTaskById);
router.put("/tasks/:id", authMiddleware_1.default, taskController_1.updateTaskById);
router.delete("/tasks/:id", authMiddleware_1.default, taskController_1.deleteTaskById);
exports.default = router;
