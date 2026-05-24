import { StatusCodes } from "http-status-codes";
import mongoose from "mongoose";
import Estimation from "../models/estimationModel.js";
import { NotFoundError } from "../errors/customErrors.js";

export const createEstimation = async (req, res) => {
  const estimation = await Estimation.create({
    ...req.body,
    createdBy: req.user.userId,
  });
  res.status(StatusCodes.CREATED).json({ msg: "Estimation created successfully", estimation });
};

export const getAllEstimations = async (req, res) => {
  const { search, status, month } = req.query;

  const queryObject = {
    createdBy: req.user.userId,
  };

  if (search) {
    queryObject.$or = [
      { id: { $regex: search, $options: "i" } },
      { companyName: { $regex: search, $options: "i" } },
      { project: { $regex: search, $options: "i" } },
    ];
  }

  if (status && status !== "All") {
    queryObject.status = status;
  }

  if (month && month !== "All") {
    // Match date string formats like YYYY-MM-DD
    queryObject.date = { $regex: new RegExp(`^\\d{4}-${month}-`) };
  }

  const estimations = await Estimation.find(queryObject).sort("-createdAt");
  res.status(StatusCodes.OK).json({ estimations });
};

export const getSingleEstimation = async (req, res) => {
  const { id } = req.params;
  const isObjectId = mongoose.isValidObjectId(id);

  const estimation = await Estimation.findOne({
    createdBy: req.user.userId,
    $or: [
      { id: id },
      ...(isObjectId ? [{ _id: id }] : []),
    ],
  });

  if (!estimation) {
    throw new NotFoundError(`No estimation with ID ${id}`);
  }
  res.status(StatusCodes.OK).json({ estimation });
};

export const updateEstimation = async (req, res) => {
  const { id } = req.params;
  const isObjectId = mongoose.isValidObjectId(id);

  const estimation = await Estimation.findOneAndUpdate(
    {
      createdBy: req.user.userId,
      $or: [
        { id: id },
        ...(isObjectId ? [{ _id: id }] : []),
      ],
    },
    req.body,
    { new: true, runValidators: true }
  );

  if (!estimation) {
    throw new NotFoundError(`No estimation with ID ${id}`);
  }
  res.status(StatusCodes.OK).json({ msg: "Estimation updated successfully", estimation });
};

export const deleteEstimation = async (req, res) => {
  const { id } = req.params;
  const isObjectId = mongoose.isValidObjectId(id);

  const estimation = await Estimation.findOneAndDelete({
    createdBy: req.user.userId,
    $or: [
      { id: id },
      ...(isObjectId ? [{ _id: id }] : []),
    ],
  });

  if (!estimation) {
    throw new NotFoundError(`No estimation with ID ${id}`);
  }
  res.status(StatusCodes.OK).json({ msg: "Estimation deleted successfully", estimation });
};
