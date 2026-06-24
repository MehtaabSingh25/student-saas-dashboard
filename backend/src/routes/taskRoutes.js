import express from "express";

import protect from "../middleware/authMiddleware.js";

import {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
  getDashboardStats,
  getAnalytics,
  getWeeklyStats,
  getDashboardTasks,
} from "../controllers/taskController.js";

const router = express.Router();

router.post("/", protect, createTask);

router.get("/", protect, getTasks);

router.get("/stats", protect, getDashboardStats);

router.get("/dashboard", protect, getDashboardTasks);

router.get("/analytics", protect, getAnalytics);

router.get("/weekly-stats", protect, getWeeklyStats);

router.put("/:id", protect, updateTask);

router.delete("/:id", protect, deleteTask);

export default router;
