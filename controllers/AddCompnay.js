import { StatusCodes } from "http-status-codes";
import Company from "../models/addCompanyModel.js";
import { NotFoundError } from "../errors/customErrors.js";

export const createCompany = async (req, res) => {
  const company = await Company.create({
    ...req.body,
    createdBy: req.user.userId,
  });
  res
    .status(StatusCodes.CREATED)
    .json({ msg: "Company created successfully", company });
};

export const editCompany = async (req, res) => {
  const { id } = req.params;
  const company = await Company.findOneAndUpdate(
    { _id: id, createdBy: req.user.userId },
    req.body,
    { new: true, runValidators: true },
  );
  if (!company) {
    throw new NotFoundError(`No company with id ${id}`);
  }
  res
    .status(StatusCodes.OK)
    .json({ msg: "Company edit successfully", company });
};

export const deleteCompany = async (req, res) => {
  const { id } = req.params;
  const company = await Company.findOneAndDelete({
    _id: id,
    createdBy: req.user.userId,
  });
  if (!company) {
    throw new NotFoundError(`No company with id ${id}`);
  }
  res
    .status(StatusCodes.OK)
    .json({ msg: "Company deleted successfully", company });
};

export const getAllCompanies = async (req, res) => {
  const companies = await Company.find({ createdBy: req.user.userId });
  res
    .status(StatusCodes.OK)
    .json({ msg: "Company fetched successfully", companies });
};

export const getSingleCompany = async (req, res) => {
  const { id } = req.params;
  const company = await Company.findOne({
    _id: id,
    createdBy: req.user.userId,
  });
  if (!company) {
    throw new NotFoundError(`No company with id ${id}`);
  }
  res
    .status(StatusCodes.OK)
    .json({ msg: "Company fetched successfully", company });
};
