import express from "express";
import { getAppStats, updateUserRole } from "../controllers/adminController.js";

const router = express.Router();

router.get("/app-stats", getAppStats);
router.put("/users/:id/role", updateUserRole);

export default router;
