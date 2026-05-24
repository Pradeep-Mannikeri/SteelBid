import express from "express";
import { register, login, logout, getCurrentUser } from "../controllers/authController.js";
import { authenticateUser } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/current-user", authenticateUser, getCurrentUser);

export default router;
