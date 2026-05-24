import express from "express";
import {
  createCompany,
  editCompany,
  deleteCompany,
  getAllCompanies,
  getSingleCompany,
} from "../controllers/AddCompnay.js";

const router = express.Router();

router.post("/", createCompany);
router.put("/:id", editCompany);
router.delete("/:id", deleteCompany);
router.get("/", getAllCompanies);
router.get("/:id", getSingleCompany);

export default router;
