import { StatusCodes } from "http-status-codes";

export const validateRegisterInput = (req, res, next) => {
  const { name, email, password, phoneNumber, country, city } = req.body;
  const errors = [];

  if (
    !name ||
    typeof name !== "string" ||
    name.trim().length < 3 ||
    name.trim().length > 50
  ) {
    errors.push("Name must be between 3 and 50 characters long");
  }

  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!email || !emailRegex.test(email)) {
    errors.push("Please provide a valid email address");
  }

  if (!password || typeof password !== "string" || password.length < 6) {
    errors.push("Password must be at least 6 characters long");
  }

  if (
    !phoneNumber ||
    typeof phoneNumber !== "string" ||
    phoneNumber.trim() === ""
  ) {
    errors.push("Phone number is required");
  }

  if (!country || typeof country !== "string" || country.trim() === "") {
    errors.push("Country is required");
  }

  if (!city || typeof city !== "string" || city.trim() === "") {
    errors.push("City is required");
  }

  if (errors.length > 0) {
    return res.status(StatusCodes.BAD_REQUEST).json({ msg: errors.join(", ") });
  }

  next();
};

export const validateLoginInput = (req, res, next) => {
  const { email, password } = req.body;
  const errors = [];

  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!email || !emailRegex.test(email)) {
    errors.push("Please provide a valid email address");
  }

  if (!password) {
    errors.push("Please provide a password");
  }

  if (errors.length > 0) {
    return res.status(StatusCodes.BAD_REQUEST).json({ msg: errors.join(", ") });
  }

  next();
};

export const validateCompanyInput = (req, res, next) => {
  const { companyName, location } = req.body;
  const errors = [];

  if (
    !companyName ||
    typeof companyName !== "string" ||
    companyName.trim() === ""
  ) {
    errors.push("Company Name is required");
  }

  if (!location || typeof location !== "string" || location.trim() === "") {
    errors.push("Location is required");
  }

  if (errors.length > 0) {
    return res.status(StatusCodes.BAD_REQUEST).json({ msg: errors.join(", ") });
  }

  next();
};

export const validateEstimationInput = (req, res, next) => {
  const { id, companyName, location, project, hours, price } = req.body;
  const errors = [];

  if (!id || typeof id !== "string" || id.trim() === "") {
    errors.push("Estimation ID/Number is required");
  }

  if (
    !companyName ||
    typeof companyName !== "string" ||
    companyName.trim() === ""
  ) {
    errors.push("Company Name is required");
  }

  if (!location || typeof location !== "string" || location.trim() === "") {
    errors.push("Location is required");
  }

  if (!project || typeof project !== "string" || project.trim() === "") {
    errors.push("Project name is required");
  }

  if (hours === undefined || isNaN(hours) || Number(hours) < 0) {
    errors.push("Valid total hours must be provided");
  }

  if (price === undefined || isNaN(price) || Number(price) < 0) {
    errors.push("Valid price must be provided");
  }

  if (errors.length > 0) {
    return res.status(StatusCodes.BAD_REQUEST).json({ msg: errors.join(", ") });
  }

  next();
};
