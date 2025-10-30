import express from "express";
import { loginUser, loggedInUser } from "../../controllers/admin/auth.controllers.js";
import isLoggedIn from "../../middleware/admin/auth.middleware.js";

const router = express.Router();

router.post("/login", loginUser);
router.get("/loggedIn", isLoggedIn, loggedInUser);

export default router;
