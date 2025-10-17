import express from 'express';
import multer from "multer";
import { verifyToken } from "../../middleware/auth.js";
const upload = multer();
import { getUser, addUsers,deleteUser,changePassword,updateUser,getUserById 
    ,requestPasswordReset,resetPassword
} from '../../controllers/userControllers.js'; // note the .js

const router = express.Router();
// Protected routes (with verifyToken)
// Route for creating a user
router.post("/users", upload.none(),verifyToken, addUsers);

// Route for getting users
router.get('/users', verifyToken,getUser);
// Router for delete users
router.delete("/users/:id",verifyToken, deleteUser);
// Router for change-password user
router.put("/users/:id",verifyToken, changePassword);
router.put("/users/:id", upload.none(),verifyToken,updateUser);
router.get("/users/:id", verifyToken, getUserById);

// Public routes (no verifyToken)
router.post("/users/request-reset", requestPasswordReset);
router.post("/users/reset-password", resetPassword);
export default router;
