import { StatusCodes } from "http-status-codes";

const errorHandlerMiddleware = (err, req, res, next) => {
  const statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  const msg = err.message || "Something went wrong, try again later";

  if (statusCode === StatusCodes.INTERNAL_SERVER_ERROR) {
    console.error(err);
  } else {
    console.warn(`${err.name || "Error"} (${statusCode}): ${msg}`);
  }

  res.status(statusCode).json({ msg });
};

export default errorHandlerMiddleware;
