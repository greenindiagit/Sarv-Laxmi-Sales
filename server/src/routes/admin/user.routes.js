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
import isLoggedIn from "../../middlewares/admin/auth.middleware.js";

const router = express.Router();

// Protected Routes
router.get("/users", isLoggedIn, getAllUsers);
router.post("/users", isLoggedIn, registerUser);
router.get("/users/:id", isLoggedIn, getUserById);
router.put("/users/:id", isLoggedIn, updateUser);
router.delete("/users/:id", isLoggedIn, deleteUser);
router.put("/users/:id/change-password", isLoggedIn, changePassword);

// Public Password Reset Routes
router.post("/users/request-password-reset", requestPasswordReset);
router.post("/users/reset-password", resetPassword);

export default router;
