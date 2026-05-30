import express from "express";
import {
  createEstimation,
  getAllEstimations,
  getSingleEstimation,
  updateEstimation,
  deleteEstimation,
} from "../controllers/estimationController.js";
import { validateEstimationInput } from "../middleware/validationMiddleware.js";

const router = express.Router();

router.route("/")
  .post(validateEstimationInput, createEstimation)
  .get(getAllEstimations);

router.route("/:id")
  .get(getSingleEstimation)
  .put(validateEstimationInput, updateEstimation)
  .delete(deleteEstimation);

export default router;
