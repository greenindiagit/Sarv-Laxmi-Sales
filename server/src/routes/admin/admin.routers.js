import express from "express";
import authRoutes from "./auth.routers.js";
import userRoutes from "./user.routes.js";
import slugRoutes from "./slug.routes.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/slug", slugRoutes);

export default router;
