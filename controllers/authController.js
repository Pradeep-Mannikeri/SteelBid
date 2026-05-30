import { StatusCodes } from "http-status-codes";
import User from "../models/userModel.js";
import Settings from "../models/settingsModel.js";
import DemoUsage from "../models/demoUsageModel.js";
import { BadRequestError, UnauthenticatedError } from "../errors/customErrors.js";
import { createJWT } from "../utils/tokenUtils.js";

export const register = async (req, res) => {
  const { name, email, password, phoneNumber, country, city, userType } = req.body;

  const emailExists = await User.findOne({ email });
  if (emailExists) {
    throw new BadRequestError("Email already exists");
  }

  // The first user registered is automatically an admin
  const isFirstAccount = (await User.countDocuments()) === 0;
  const role = isFirstAccount ? "admin" : "user";

  const user = await User.create({ name, email, password, role, phoneNumber, country, city, userType: userType || "demo" });
  res.status(StatusCodes.CREATED).json({ 
    msg: "user created", 
    user: { name: user.name, email: user.email, phoneNumber: user.phoneNumber, country: user.country, city: user.city, userType: user.userType } 
  });
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError("Please provide email and password");
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new UnauthenticatedError("Invalid credentials");
  }

  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Invalid credentials");
  }

  const token = createJWT({ userId: user._id, role: user.role });

  const oneDay = 1000 * 60 * 60 * 24;

  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  });

  res.status(StatusCodes.OK).json({ 
    msg: "user logged in", 
    user: { name: user.name, email: user.email, role: user.role } 
  });
};

export const logout = async (req, res) => {
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  });
  res.status(StatusCodes.OK).json({ msg: "user logged out!" });
};

export const getCurrentUser = async (req, res) => {
  const user = await User.findOne({ _id: req.user.userId });
  if (!user) {
    throw new UnauthenticatedError("User not found");
  }
  res.status(StatusCodes.OK).json({ 
    user: { 
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      userType: user.userType,
      createdAt: user.createdAt,
      phoneNumber: user.phoneNumber,
      country: user.country,
      city: user.city
    } 
  });
};

export const getDemoLimit = async (req, res) => {
  let settings = await Settings.findOne();
  if (!settings) {
    settings = await Settings.create({});
  }

  // Check current client IP address usage
  const ipAddress = req.headers["x-forwarded-for"] || req.socket.remoteAddress || req.ip;
  const usageRecord = await DemoUsage.findOne({ ipAddress });

  let ipBlocked = false;
  let ipCount = 0;
  if (usageRecord) {
    ipCount = usageRecord.count;
    if (usageRecord.count >= settings.demoLimit) {
      ipBlocked = true;
    }
  }

  res.status(StatusCodes.OK).json({ 
    demoLimit: settings.demoLimit,
    ipBlocked,
    ipCount
  });
};

export const checkDemoUsage = async (req, res) => {
  const { name, email, mobile } = req.body;
  if (!name || !email || !mobile) {
    throw new BadRequestError("Please provide name, email and mobile number");
  }

  // Get client IP address
  const ipAddress = req.headers["x-forwarded-for"] || req.socket.remoteAddress || req.ip;

  // Get active demo limit
  let settings = await Settings.findOne();
  const demoLimit = settings ? settings.demoLimit : 5;

  const cleanEmail = email.trim().toLowerCase();
  const cleanMobile = mobile.trim();

  // Search if a demo has already been run for this email, mobile, or IP
  let usageRecord = await DemoUsage.findOne({
    $or: [
      { email: cleanEmail },
      { mobile: cleanMobile },
      { ipAddress: ipAddress }
    ]
  });

  if (usageRecord) {
    if (usageRecord.count >= demoLimit) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        blocked: true,
        msg: "You have exceeded the trial limit. Please purchase the application for the best use case.",
        count: usageRecord.count,
        demoLimit
      });
    }

    usageRecord.count += 1;
    usageRecord.name = name;
    usageRecord.email = cleanEmail;
    usageRecord.mobile = cleanMobile;
    usageRecord.ipAddress = ipAddress;
    await usageRecord.save();

    return res.status(StatusCodes.OK).json({
      blocked: false,
      count: usageRecord.count,
      demoLimit
    });
  }

  usageRecord = await DemoUsage.create({
    name,
    email: cleanEmail,
    mobile: cleanMobile,
    ipAddress,
    count: 1
  });

  return res.status(StatusCodes.OK).json({
    blocked: false,
    count: 1,
    demoLimit
  });
};
