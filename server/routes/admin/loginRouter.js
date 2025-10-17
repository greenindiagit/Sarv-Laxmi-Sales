import express from "express";
import { loginUser,logoutUser } from "../../controllers/loginControllers.js";
import { verifyToken } from "../../middleware/auth.js";
const router = express.Router();

// Public login
router.post("/login", loginUser);
// Logout (protected)
router.post("/logout", verifyToken, logoutUser);
export default router;
