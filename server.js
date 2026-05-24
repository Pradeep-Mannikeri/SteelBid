import "express-async-errors";
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cookieParser from "cookie-parser";

// Routers
import authRouter from "./router/authRouter.js";
import compnayRouter from "./router/compnayRouter.js";
import estimationRouter from "./router/estimationRouter.js";

// Middlewares
import { authenticateUser } from "./middleware/authMiddleware.js";
import notFoundMiddleware from "./middleware/notFoundMiddleware.js";
import errorHandlerMiddleware from "./middleware/errorHandlerMiddleware.js";

import mongoose from "mongoose";

const app = express();

app.use(cookieParser());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/compnay", authenticateUser, compnayRouter);
app.use("/api/v1/estimations", authenticateUser, estimationRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const PORT = parseInt(process.env.PORT, 10) || 5000;
try {
  await mongoose.connect(process.env.MONGO_URI);
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}
