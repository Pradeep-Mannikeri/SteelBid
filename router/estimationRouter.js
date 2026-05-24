import express from "express";
import {
  createEstimation,
  getAllEstimations,
  getSingleEstimation,
  updateEstimation,
  deleteEstimation,
} from "../controllers/estimationController.js";

const router = express.Router();

router.route("/")
  .post(createEstimation)
  .get(getAllEstimations);

router.route("/:id")
  .get(getSingleEstimation)
  .put(updateEstimation)
  .delete(deleteEstimation);

export default router;
