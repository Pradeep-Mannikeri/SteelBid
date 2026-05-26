import User from "../models/userModel.js";
import Company from "../models/addCompanyModel.js";
import Estimation from "../models/estimationModel.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../errors/customErrors.js";

export const getAppStats = async (req, res) => {
  const totalUsers = await User.countDocuments();
  const totalCompanies = await Company.countDocuments();
  const totalEstimations = await Estimation.countDocuments();

  const estimationStats = await Estimation.aggregate([
    {
      $group: {
        _id: null,
        totalPrice: { $sum: "$price" },
        totalHours: { $sum: "$hours" },
      },
    },
  ]);

  const overallStats = {
    totalUsers,
    totalCompanies,
    totalEstimations,
    totalPrice: estimationStats[0]?.totalPrice || 0,
    totalHours: estimationStats[0]?.totalHours || 0,
  };

  const userStats = await User.aggregate([
    {
      $lookup: {
        from: "companies",
        localField: "_id",
        foreignField: "createdBy",
        as: "userCompanies",
      },
    },
    {
      $lookup: {
        from: "estimations",
        localField: "_id",
        foreignField: "createdBy",
        as: "userEstimations",
      },
    },
    {
      $project: {
        _id: 1,
        name: 1,
        email: 1,
        role: 1,
        createdAt: 1,
        companyCount: { $size: "$userCompanies" },
        estimationCount: { $size: "$userEstimations" },
        totalHours: { $sum: "$userEstimations.hours" },
        totalRevenue: { $sum: "$userEstimations.price" },
      },
    },
    {
      $sort: { createdAt: -1 }
    }
  ]);

  res.status(StatusCodes.OK).json({ overallStats, userStats });
};

export const updateUserRole = async (req, res) => {
  const { id } = req.params;
  const { role } = req.body;

  if (!["user", "admin"].includes(role)) {
    throw new BadRequestError("Invalid role");
  }

  // Prevent users from changing their own role to avoid accidental lockout
  if (req.user.userId === id) {
    throw new BadRequestError("You cannot change your own role");
  }

  const user = await User.findByIdAndUpdate(id, { role }, { new: true });
  if (!user) {
    throw new NotFoundError(`No user found with id ${id}`);
  }

  res.status(StatusCodes.OK).json({
    msg: "User role updated successfully",
    user: { _id: user._id, name: user.name, role: user.role }
  });
};
