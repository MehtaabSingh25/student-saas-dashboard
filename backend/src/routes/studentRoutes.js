import express from "express";
import protect from "../middleware/authMiddleware.js";

import {
  createStudent,
  loginStudent,
  getProfile,
  updateProfile,
  changePassword,
} from "../controllers/studentController.js";

const router = express.Router();

router.post("/register", createStudent);

router.post("/login", loginStudent);

router.get("/profile", protect, getProfile);

router.put("/profile", protect, updateProfile);

router.put("/change-password", protect, changePassword);

export default router;
