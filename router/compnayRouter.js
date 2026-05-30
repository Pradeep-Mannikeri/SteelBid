import express from "express";
import {
  createCompany,
  editCompany,
  deleteCompany,
  getAllCompanies,
  getSingleCompany,
} from "../controllers/AddCompnay.js";
import { validateCompanyInput } from "../middleware/validationMiddleware.js";

const router = express.Router();

router.post("/", validateCompanyInput, createCompany);
router.put("/:id", validateCompanyInput, editCompany);
router.delete("/:id", deleteCompany);
router.get("/", getAllCompanies);
router.get("/:id", getSingleCompany);

export default router;
