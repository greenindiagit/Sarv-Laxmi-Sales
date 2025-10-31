import express from "express";
import {
  getAllUsers,
  registerUser,
  deleteUser,
  updateUser,
  getUserById,
  changePassword,
  requestPasswordReset,
  resetPassword,
} from "../../controllers/admin/user.controller.js";
import isLoggedIn from "../../middleware/admin/auth.middleware.js";

const router = express.Router();

// Protected Routes
router.get("/", isLoggedIn, getAllUsers);
router.post("/register", isLoggedIn, registerUser);
router.get("/:id", isLoggedIn, getUserById);
router.put("/:id", isLoggedIn, updateUser);
router.delete("/:id", isLoggedIn, deleteUser);
router.put("/change-password/:id", isLoggedIn, changePassword);

// Public Password Reset Routes
router.post("/request-password-reset", requestPasswordReset);
router.post("/reset-password", resetPassword);

export default router;
