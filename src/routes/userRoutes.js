import express from "express";
import {
  registerUser,
  loginUser,
  uploadAssignment,
  viewAssignments,
  updateAssignmentStatus,
  viewAdmins,
} from "../controllers/userController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

// User and admin routes
router.post("/register", registerUser); //user and admin both can register
router.post("/login", loginUser); //user and admin both can login
router.post("/upload", authMiddleware(["user"]), uploadAssignment); //user can upload assignment
router.get("/admins", authMiddleware(["user"]), viewAdmins); //user can fetch all admins.
router.get("/assignments", authMiddleware(["admin"]), viewAssignments); //admin can View assignments tagged to them.
router.patch(
  "/assignment/:id",
  authMiddleware(["admin"]),
  updateAssignmentStatus
); //admin can Accept or reject assignments by updating status.

export default router;
