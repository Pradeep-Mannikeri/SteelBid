import "express-async-errors";
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

// Routers
import authRouter from "./router/authRouter.js";
import compnayRouter from "./router/compnayRouter.js";
import estimationRouter from "./router/estimationRouter.js";
import adminRouter from "./router/adminRouter.js";

// Middlewares
import { authenticateUser, authorizePermissions } from "./middleware/authMiddleware.js";
import notFoundMiddleware from "./middleware/notFoundMiddleware.js";
import errorHandlerMiddleware from "./middleware/errorHandlerMiddleware.js";

import mongoose from "mongoose";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  }),
);

app.use(express.static(path.resolve(__dirname, "./client/dist")));

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/compnay", authenticateUser, compnayRouter);
app.use("/api/v1/estimations", authenticateUser, estimationRouter);
app.use("/api/v1/admin", authenticateUser, authorizePermissions("admin"), adminRouter);

// Serve the frontend index.html for all other client routes (React Router handles navigation)
app.get("*", (req, res, next) => {
  if (req.originalUrl.startsWith("/api")) {
    return next();
  }
  res.sendFile(path.resolve(__dirname, "./client/dist/index.html"));
});

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const PORT = parseInt(process.env.PORT, 10) || 5000;
try {
  console.log("Connecting to MongoDB...");
  await mongoose.connect(process.env.MONGO_URI);
  console.log("MongoDB connected successfully!");
  if (!process.env.VERCEL) {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  }
} catch (error) {
  console.log("MongoDB connection error:", error);
  if (!process.env.VERCEL) {
    process.exit(1);
  }
}

export default app;
