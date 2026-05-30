import express from "express";
import { register, login, logout, getCurrentUser, getDemoLimit, checkDemoUsage } from "../controllers/authController.js";
import { authenticateUser } from "../middleware/authMiddleware.js";
import { validateRegisterInput, validateLoginInput } from "../middleware/validationMiddleware.js";

const router = express.Router();

router.post("/register", validateRegisterInput, register);
router.post("/login", validateLoginInput, login);
router.get("/logout", logout);
router.get("/current-user", authenticateUser, getCurrentUser);
router.get("/demo-limit", getDemoLimit);
router.post("/check-demo-usage", checkDemoUsage);

export default router;
