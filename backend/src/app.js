import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import studentRoutes from "./routes/studentRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import errorHandler from "./middleware/errorMiddleware.js";

import rateLimit from "express-rate-limit";

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,

  max: 100,

  message: {
    message: "Too many requests. Try again later.",
  },
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,

  max: 5,

  message: {
    message: "Too many login attempts",
  },
});

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://student-saas-dashboard.vercel.app",
    ],
    credentials: true,
  }),
);

app.use(morgan("dev"));
app.use(helmet());
if (process.env.NODE_ENV === "production") {
  app.use(limiter);
}
app.use("/api/students/login", authLimiter);
app.use("/api/students/register", authLimiter);

app.use(express.json({ limit: "10kb" }));
app.use("/api/students", studentRoutes);
app.use("/api/tasks", taskRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "Student SaaS API Running",
  });
});

app.use(errorHandler);

export default app;
