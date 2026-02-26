const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");

const authRoutes = require("./routes/auth.routes");
const taskRoutes = require("./routes/task.routes");
const errorHandler = require("./middlewares/error.middleware");

const app = express();

// Security Middlewares

// Set secure HTTP headers
app.use(helmet());

// Rate limiting to prevent brute force attacks
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP
  message: "Too many requests from this IP, please try again later",
});
app.use(limiter);

// Logging
app.use(morgan("dev"));

// Parse JSON body
app.use(express.json());

// Parse cookies
app.use(cookieParser());

// CORS configuration
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  }),
);

// Routes

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

// Error Handler (Must Be Last)

app.use(errorHandler);

module.exports = app;
